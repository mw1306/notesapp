import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify, Storage, API } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import KoalaRescueForm from "./KoalaRescueForm"; // import your new form component

Amplify.configure(outputs);

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data: notes } = await API.get("yourApiName", "/notes");
    await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await Storage.get(`media/${note.image}`);
          note.image = linkToStorageFile;
        }
        return note;
      })
    );
    setNotes(notes);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const newNote = {
      name: form.get("name"),
      description: form.get("description"),
      image: form.get("image").name,
    };

    const { data } = await API.post("yourApiName", "/notes", { body: newNote });

    if (newNote.image) {
      await Storage.put(`media/${newNote.image}`, form.get("image"));
    }

    fetchNotes();
    event.target.reset();
  }

  async function deleteNote(id) {
    await API.del("yourApiName", `/notes/${id}`);
    fetchNotes();
  }

  const createRescue = async (data) => {
    // Integrate this with your AWS Amplify backend to store rescue data
    console.log("Rescue data:", data);
  };

  return (
    <Authenticator>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Heading level={1}>Koala Rescue Form</Heading>
        <KoalaRescueForm createRescue={createRescue} />

        <Heading level={2}>Notes</Heading>
        <View as="form" onSubmit={createNote}>
          <TextField name="name" placeholder="Note Name" />
          <TextField name="description" placeholder="Note Description" />
          <input type="file" name="image" />
          <Button type="submit">Create Note</Button>
        </View>

        <Grid>
          {notes.map((note) => (
            <Flex key={note.id} direction="column">
              <Text>{note.name}</Text>
              <Text>{note.description}</Text>
              {note.image && <Image src={note.image} alt={note.name} />}
              <Button onClick={() => deleteNote(note.id)}>Delete</Button>
              <Divider />
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Authenticator>
  );
}
