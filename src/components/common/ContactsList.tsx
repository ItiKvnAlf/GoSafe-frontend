import React, { useState } from "react";
import { IonItem, IonList, IonCheckbox } from "@ionic/react";
import { UserState } from "../../redux/userSlice";

interface ContactsListProps {
  user: UserState;
  maxHeightValue: string;
  onContactSelectionChange: (selected: boolean) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  user,
  maxHeightValue,
  onContactSelectionChange,
}) => {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    const isSelected = selectedContacts.includes(index);
    const updatedSelection = isSelected
      ? selectedContacts.filter((item) => item !== index)
      : [...selectedContacts, index];

    setSelectedContacts(updatedSelection);
    onContactSelectionChange(updatedSelection.length > 0);
  };

  return (
    <>
      {user.contacts.length === 0 ? (
        <p style={{ textAlign: "center", marginLeft: "10%", marginRight: "10%" }}>
          'No hay contactos'
        </p>
      ) : (
        <div
          style={{
            maxHeight: maxHeightValue,
            overflowY: "auto",
            textAlign: "center",
            marginLeft: "10%",
            marginRight: "10%",
            borderRadius: "20px",
          }}
        >
          <IonList>
            {user.contacts.map((contact, index) => (
              <IonItem key={index}>
                <IonCheckbox
                  checked={selectedContacts.includes(index)}
                  onIonChange={() => handleCheckboxChange(index)}
                >
                  {contact.name}
                </IonCheckbox>
              </IonItem>
            ))}
          </IonList>
        </div>
      )}
    </>
  );
};

export default ContactsList;