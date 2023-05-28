import { API, Amplify, Hub } from 'aws-amplify';
import { Stack } from 'expo-router';
import awsExports from '../src/aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { useEffect } from 'react';

Amplify.configure(awsExports);

const mutationQuery = `
mutation createUser($input:CreateUserInput!){
    createUser(input:$input){
      id,
      name, 
      handle,
      bio, 
      subscriptionPrice
    }
  }`;


const RootLayout = () => {

    useEffect(() =>{
        const removeEventListener = Hub.listen('auth', async (data) =>{
            if(data.payload.event === 'signIn'){
                const userInfo = data.payload.data.attributes
                console.log(JSON.stringify(userInfo,null,2))
                const newUser = {
                    id:userInfo.sub,
                    name:userInfo.email,
                    handle:userInfo.name,
                    bio:'',
                    subscriptionPrice:0,
                    avatar:''
                }
                await API.graphql({
                    query:mutationQuery,
                    variables:{input:newUser}
                })
                console.log('New user created')
            }
        })

        return () => {
            removeEventListener()
        }
    },[])
  return (
    <Authenticator.Provider>
      <Authenticator>
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default RootLayout;
