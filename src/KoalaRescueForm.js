import React, { useState } from "react";
import { Flex, Button, TextField, View, SelectField } from "@aws-amplify/ui-react";

function KoalaRescueForm({ createRescue }) {
  const [formData, setFormData] = useState({
    uniqueId: "",
    hotlinerName: "",
    shiftDetails: "",
    callTimeInput: "",
    mopPh: "",
    mopName: "",
    koalaAddress: "",
    gpsLatitude: "",
    gpsLongitude: "",
    koalaLocation: "",
    rescueReason: "",
    rescueOther: "",
    mopos: "",
    rescuerA: "",
    rescuerB: "",
    otherComments: "",
    outc: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission, pass the form data to your createRescue function
      await createRescue(formData);
      alert("Rescue data submitted!");
    } catch (error) {
      console.error("Error submitting rescue:", error);
    }
  };

  return (
    <View as="form" onSubmit={handleSubmit}>
      <Flex direction="column" gap="1rem">
        <TextField
          name="uniqueId"
          label="Current Call Id #"
          value={formData.uniqueId}
          onChange={handleChange}
          readOnly
        />
        <SelectField
          label="Hotliner"
          name="hotlinerName"
          value={formData.hotlinerName}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="hl one">Hotliner One</option>
          <option value="hl two">Hotliner Two</option>
        </SelectField>
        
        <SelectField
          label="Shift"
          name="shiftDetails"
          value={formData.shiftDetails}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
        </SelectField>

        <TextField
          label="Call Time"
          name="callTimeInput"
          type="time"
          value={formData.callTimeInput}
          onChange={handleChange}
        />

        <TextField
          label="MOP Phone"
          name="mopPh"
          value={formData.mopPh}
          onChange={handleChange}
          maxLength="30"
        />
        <TextField
          label="MOP Full Name"
          name="mopName"
          value={formData.mopName}
          onChange={handleChange}
          maxLength="30"
        />
        <TextField
          label="Koala Address"
          name="koalaAddress"
          value={formData.koalaAddress}
          onChange={handleChange}
        />

        <TextField
          label="Approx Latitude"
          name="gpsLatitude"
          value={formData.gpsLatitude}
          onChange={handleChange}
        />
        <TextField
          label="Approx Longitude"
          name="gpsLongitude"
          value={formData.gpsLongitude}
          onChange={handleChange}
        />

        <TextField
          label="Koala Location"
          name="koalaLocation"
          value={formData.koalaLocation}
          onChange={handleChange}
        />

        <SelectField
          label="Rescue Reason"
          name="rescueReason"
          value={formData.rescueReason}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Injury">Injury</option>
          <option value="Disease">Disease</option>
        </SelectField>

        <TextField
          label="Rescue other details"
          name="rescueOther"
          value={formData.rescueOther}
          onChange={handleChange}
        />

        <SelectField
          label="MOP Present"
          name="mopos"
          value={formData.mopos}
          onChange={handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </SelectField>

        <Button type="submit">Submit</Button>
      </Flex>
    </View>
  );
}

export default KoalaRescueForm;
