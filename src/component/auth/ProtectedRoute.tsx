import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

interface Props {
  component: React.ComponentType<unknown>;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component }) => {
  const location = useHistory();
  const authentication = auth;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(authentication, (user: User | null) => {
      if (user) {
        // const loginProvider = user.providerData[0].providerId; // password / google.com
        setIsLoggedIn(true);
      }
      else{
        location.push("/login");
        setIsLoggedIn(false);
      }
    });
}, []);

  return (
    <>
        {isLoggedIn ? <Component /> : 
            <div className="flex justify-center items-center">
              <span className="text-gray-800 loading loading-spinner loading-lg mt-52"></span>
            </div> 
        }
    </>
  );
};

export default ProtectedRoute;