import { View, Text, Image} from 'react-native';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const UserPosts = ({post,user}) => {
    const [imageUri,setImageUri] = useState()
    useEffect(() => {
        if(post.image){
            Storage.get(post.image).then((imageUri) => setImageUri(imageUri))
        }
    },[post.image])
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Image
          src={user?.avatar}
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: 600, fontSize: 16, marginBottom: 3 }}>{user?.name}</Text>
          <Text style={{ marginRight: 5, color: 'grey' }}>@{user?.handle}</Text>
        </View>
        <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 5, color: 'grey' }}>3 hours ago</Text>
          <Entypo
            style={{ marginRight: 5, color: 'grey' }}
            name="dots-three-horizontal"
            size={24}
            color="black"
          />
        </View>
      </View>
      <Text style={{ margin: 10, lineHeight: 19 }}>{post?.text}</Text>
     {imageUri &&  <Image style={{ width: '100%', aspectRatio: 1 }} src={imageUri}></Image>}
      <View style={{ margin: 10, flexDirection: 'row' }}>
        <Feather name="heart" size={22} color="grey" style={{ marginRight: 10 }} />
        <FontAwesome name="dollar" size={22} color="grey" style={{ marginRight: 10 }} />
      </View>
      <Text style={{ fontWeight: 600, marginHorizontal: 10 }}>{post?.likes} Likes</Text>
    </View>
  );
};

export default UserPosts;
