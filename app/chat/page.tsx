import EmptyState from '@/components/EmptyState';
import getUsers from "@/libs/actions/getUsers";
import UserList from "./components/UserList";

const People = async () => {
  const users = await getUsers();

  return (
    <UserList items={users} />
   );
}
 
export default People;
