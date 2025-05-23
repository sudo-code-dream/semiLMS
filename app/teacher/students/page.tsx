"use client"
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function UsersList() {
  const users = useQuery(api.users.getAllUsers);
  const assignPlan = useMutation(api.users.assignInstitutionPlan);


  const [selectedUserId, setSelectedUserId] = useState<Id<"users"> | null>(
    null
  );

  const [schoolName, setSchoolName] = useState("");

  if (!users) return <div>Loading...</div>;

  const handleAssign = () => {
    if (!selectedUserId || !schoolName) {
      alert("Select user and enter school");
      return;
    }

    assignPlan({ userId: selectedUserId, schoolName })
      .then(() => {
        alert("Institution plan assigned!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id.toString()}>
            <label>
              <input
                type='radio'
                name='selectedUser'
                value={user._id.toString()}
                onChange={() => setSelectedUserId(user._id)}
              />
              {user.name} ({user.role})
            </label>
          </li>
        ))}
      </ul>

      <input
        type='text'
        placeholder='Enter school name'
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      />
      <button onClick={handleAssign}>Assign Institution Plan</button>
    </div>
  );
}
