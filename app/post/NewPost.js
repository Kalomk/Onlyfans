import { useState } from 'react';
import { SafeAreaView, TextInput, Button, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { DataStore,Storage } from 'aws-amplify';
import { Post } from '../../src/models';
import {useAuthenticator} from '@aws-amplify/ui-react-native'
import * as Crypto from 'expo-crypto';


const NewPost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();
  const {user} = useAuthenticator()

  const onPost = async () => {
    const fileUpload = await pathToImageFile()
    await DataStore.save(new Post({
        text,likes:0,userID:user.attributes.sub, image:fileUpload
    }))
    setText('')
    setImage('')
  }
  async function pathToImageFile() {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileKey = `${Crypto.randomUUID()}.png`
      await Storage.put(fileKey, blob, {
        contentType: 'image/jpeg' // contentType is optional
      });
      return fileKey
    } catch (err) {
      console.log('Error uploading file:', err);
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{ marginHorizontal: 10, marginBottom: 30 }}>
        <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="black" />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <TextInput
          placeholder="Compose new post..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={3}
          style={{
            marginBottom: 20,
            borderColor: 'black',
            borderWidth: 1,
            width: '100%',
            height: 100,
          }}
        />
        <View style={{ marginVertical: 15 }}>
          <Ionicons onPress={pickImage} name="image-outline" size={24} color="black" />
        </View>
      </View>
      {image && <Image src={image} style={{ aspectRatio: 1, width: '100%' }} />}
      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default NewPost;
