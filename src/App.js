import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'
import axios from 'axios'

export default function App() {

  const [repositories, setRepositories] = useState([])
  const [like, setLike] = useState([])



  useEffect(() => {
    api.get('repositories/').then(response => {
      //console.log(response.data)
      setRepositories(response.data) 
    })
  },[repositories])

  async function handleLikeRepository(id, title, url, tech) {
    
    await api.post(`repositories/${id}/like`,
    {
      "title": title,
      "url": url,
      "techs": tech,
    }
      ).then(response => {     
      //setRepositories(response.data)
      
      
  }
)

  }  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

      <FlatList
        data={repositories}
        key={repositories.id}
        renderItem={({ item: repository }) => (

          <View style={styles.repositoryContainer}>

          <Text style={styles.repository}>
          {repository.title}
          </Text>


          <View style={styles.techsContainer}>

            <Text style={styles.tech}>
              {repository.techs[0]}      
            </Text>

            <Text style={styles.tech}>
              {repository.techs[1]}      
            </Text>

        </View>

        <View style={styles.likesContainer}>
          <Text
            style={styles.likeText}
            // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
            testID={`repository-likes-1`}
          > Likes: {repository.likes}
          </Text> 
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLikeRepository(repository.id, repository.title, repository.url, repository.techs)}
          // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
          testID={`like-button-1`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>

      </View>

           
      )}

      />
       
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
