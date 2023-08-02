import { Button, Center } from "@mantine/core";
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  return (
   <Center mt="5rem">
    <Authenticator hideSignUp>
    {({ signOut, user }) => (
        <main>
          <h1>Hello, {user?.username}</h1>
          <Button.Group>
            <Button onClick={signOut} color="red">Sign out</Button>
            <Button onClick={() => navigate('/articles')}>Go to Articles</Button>
          </Button.Group>
        </main>
      )}
    </Authenticator>
   </Center> 
  )
};