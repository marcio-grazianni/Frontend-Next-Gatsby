import React, { useEffect } from 'react';
import { AddressFormWrapper } from './style';

class CoBorrowerGoogleAddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      googleMapLink: '',
      route: '',
      searchAddress: '',
    };

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addScript = this.addScript.bind(this);
    this.autocomplete = null;
  }

  addScript = (url) => {
    let _this = this;
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      _this.initAutocomplete();
    });
  };

  initAutocomplete = () => {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    );
    this.autocomplete.setFields(['address_component']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  async componentDidMount() {
    if (!window.google) {
      this.addScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBoX9TcSyTm7z6rlQcg_4nric2RCwb_PAA&libraries=places&v=weekly'
      );
    } else {
      this.initAutocomplete();
    }
  }

  initialState() {
    this.setState({
      name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      googleMapLink: '',
      route: '',
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log('in google handle change');
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handlePlaceSelect() {
    console.log('in handle place select');
    this.initialState();
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    console.log('address', address);
    const keysArray = [
      'street_number',
      'route',
      'locality',
      'administrative_area_level_1',
      'country',
      'postal_code',
    ];
    for (var i = 0; i < keysArray.length; i++) {
      let key = keysArray[i];
      if (typeof address == undefined) return;
      for (var j = 0; j < address.length; j++) {
        let types = address[j].types;
        let found = types.findIndex((item) => item == key);
        if (found > -1) {
          this.setState({ '${key}': address[j].long_name });
          switch (key) {
            case 'street_number':
              this.setState({ street_address: address[j].long_name });
              console.log('street address', this.state.street_address);
              break;
            case 'route':
              this.setState({ route: address[j].long_name });
              break;
            case 'locality':
              this.setState({ city: address[j].long_name });
              break;
            case 'administrative_area_level_1':
              this.setState({ state: address[j].short_name });
              break;
            case 'country':
              this.setState({ country: address[j].long_name });
              break;
            case 'postal_code':
              this.setState({ zip_code: address[j].long_name });
              break;
            default:
            // code block
          }
          break;
        }
      }
    }
    this.props.onChangeValue(this.state);
  }

  geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new window.google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  };

  render() {
    return (
      <div id="locationField">
        <label>Primary Home Address</label>
        <br />
        <form>
          <input
            className="ant-input"
            id="autocomplete"
            placeholder="Search your address"
            onFocus={(e) => {
              this.geolocate();
            }}
            autoComplete={'off'}
          />
        </form>
      </div>
    );
  }
}

export default CoBorrowerGoogleAddressSearch;
