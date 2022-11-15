import { useState, useEffect } from 'react';
import { getUserByUid } from './FirestoreServices';

export default function useUser(uid) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUserId(uid) {
      const user = await getUserByUid(uid);
      setActiveUser(user || {});
     
    }
    if (uid) {
      getUserObjByUserId(uid);
    }
  }, [uid]);

  return { userData: activeUser, setActiveUser };
}
