import { StyleSheet, View, Text } from 'react-native';
import UserCard from '../Components/UserCard/UserCard';
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Post, User } from '../src/models';

export default function Page() {
  const { signOut } = useAuthenticator();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    DataStore.query(User).then((user) => setUsers(user));
  }, []);
  return (
    <View style={styles.container}>
      <Link
        style={{ marginTop: 20, fontSize: 20, fontWeight: 600, color: 'grey' }}
        href={`/post/NewPost`}
      >
        Add New Post
      </Link>
      <Text onPress={() => signOut()}>Sign up</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => <UserCard user = {item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
});
