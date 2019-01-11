import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import TaskServices from '../../Database/TaskServices';

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

class AutocompleteExample extends Component {

  static renderFilm(film) {
    const { title, director, opening_crawl, episode_id } = film;
    const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;

    return (
      <View>
        <Text style={styles.titleText}>{roman}. {title}</Text>
        <Text style={styles.directorText}>({director})</Text>
        <Text style={styles.openingText}>{opening_crawl}</Text>
      </View>
    );
  }

  static person(person){
    return (
        <View>
          <Text style={styles.titleText}>{person.nama}</Text>
          <Text style={styles.directorText}>({person.alamat})</Text>
        </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      person:[],
      query: '',
      test:[]
    };
  }

  componentDidMount() {
    var list = [];
    var dssa = {
        nama: 'akbar',
        alamat: 'tangerang'
    }
    this.state.person.push(dssa);
    dssa = {
        nama: 'ferdinand',
        alamat: 'solo'
    }
    this.state.person.push(dssa);
    dssa = {
        nama: 'sabrina',
        alamat: 'semarang'
    }
    this.state.person.push(dssa);
    dssa = {
        nama: 'test',
        alamat: 'jakarta'
    }
    this.state.person.push(dssa);

    const { person } = list;
    this.setState({ person });
    this.setState({test:list})
    console.log(JSON.stringify(this.state.person))

    fetch(`${API}/films/`).then(res => res.json()).then((json) => {
      const { results: films } = json;
      console.log(films)
      this.setState({ films });
    });
  }

  search(param){
    if (param === '') {
      return [];
    }
    let data = TaskServices.findBy('TM_BLOCK')
  }

  findPerson(query){
    if (query === '') {
        return [];
    }
    const { person } = this.state;
    console.log(person)
    const regex = new RegExp(`${query.trim()}`, 'i');
    console.log(regex)
    return person.filter(person => person.nama.search(regex) >= 0);
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    console.log(regex)
    return films.filter(film => film.title.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    // const person = this.findPerson(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
        
          // data={person.length === 1 && comp(query, person[0].nama) ? [] : person}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Star Wars film title"
          renderItem={({ title, release_date }) => (
            <TouchableOpacity onPress={() => this.setState({ query: title })}>
              <Text style={styles.itemText}>
                {title} ({release_date.split('-')[0]})
              </Text>
            </TouchableOpacity>
          )}
        // renderItem={({ nama, alamat }) => (
        //     <TouchableOpacity onPress={() => {this.setState({ query: nama }); alert('sadjnsakdas')}}>
        //       <Text style={styles.itemText}>
        //         {nama}. {alamat} 
        //       </Text>
        //     </TouchableOpacity>
        //   )}
        />
        <View style={styles.descriptionContainer}>
          {/* {films.length > 0 ? (
            AutocompleteExample.renderFilm(films[0])
          ) : (
            <Text style={styles.infoText}>
              Enter Title of a Star Wars movie
            </Text>
          )} */}

          {/* {person.length > 0 && (AutocompleteExample.person(person[0]))} */}
          {films.length > 0 && (AutocompleteExample.person(films[0]))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default AutocompleteExample;