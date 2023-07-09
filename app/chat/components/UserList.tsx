'use client';


import { Student } from "@prisma/client";

import UserBox from "./UserBox";

interface UserListProps {
  items: Student[];
}

const UserList: React.FC<UserListProps> = ({ 
  items, 
}) => {
  return ( 
      <div className="px-5">
        {items.map((item) => (
          <UserBox
            key={item.id}
            data={item}
          />
        ))}
      </div>
  );
}
 
export default UserList;
