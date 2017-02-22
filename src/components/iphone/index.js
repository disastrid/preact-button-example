// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_button1 from '../button/style_button1';
import style_button2 from '../button2/button2_style';
import style_button3 from '../button3/button3_style';
import style_resetButton from '../resetButton/resetButton_style';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Button2 from '../button2';
import Button3 from '../button3';
import ResetButton from '../resetButton';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.state.greet = "";
		// // button display state
		
		this.state.displayButton1 = true;
		this.state.displayButton2 = true;
		this.state.displayButton3 = false;
		this.state.displayHow = false;
		console.log(this.state);
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/e844c4334a0857a1/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ 
			displayButton1: false
			 });
	}

	fetchLocalJsonData = () => {
			
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "test.json";
		$.ajax({
			url: "../../assets/data/test.json",
			dataType: "json",
			success : this.parseLocalJson,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ 
			displayButton1: false,
			displayButton2: false,
			displayButton3: true,
			locate: "",
			temp: "",
			cond: ""
		});
	
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const phraseStyles = this.state.greet1 ? `${style.phrase1} ${style.filled}` : style.phrase1;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<h1 class={ style.phrase1 }>{ this.state.greet1 }</h1>
					<h1 class={ style.phrase1 }>{ this.state.greet2 }</h1>
					<h1 class={ style.phrase1 }>{ this.state.inst }</h1>
					{ this.state.displayHow ? <h2 class={ style.phrase2 }>{ this.state.howDid }</h2> : null }
					
				</div>


				<div class={ style_button1.container }> 
					{ this.state.displayButton1 ? <Button class={ style_button1.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>

				{ this.state.displayButton2 ?
					<div class={style_button2.button2_container}> 
						 <Button2  clickFunction={ this.fetchLocalJsonData }/ > 
					</div>
				: null }

				{ this.state.displayButton3 ?
					<div class={style_button3.button3_container}> 
						 <Button3 class={ style_button3.button } clickFunction={ this.returnPhrase }/ > 
					</div>
				: null }

				{ this.state.displayReset ?
					<div class={style_resetButton.reset_container}> 
						 <ResetButton class={ style_resetButton.button } clickFunction={ this.reset }/ > 
					</div>
				: null }

			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}

	parseLocalJson = (parsed_json) => {
		var greeting = parsed_json['phrase'];
		var greeting2 = parsed_json['another-phrase'];
		var instruction = parsed_json['inst'];
		var how = parsed_json['how'];

		// set states for fields so they could be rendered later on
		this.setState({
			greet1: greeting, 
			greet2: greeting2,
			inst: instruction,
			howDid: how
		});
		$("h1").css("background", "black");      
	}

	returnPhrase = () => {
		this.setState({
			greet1: "", 
			greet2: "",
			inst: "",
			displayButton2: false,
			displayButton3: false,
			displayReset: true,
			displayHow: true
		});      
		
		
	}

	reset = () => {
		this.setState({
			displayButton1: true,
			displayButton2: true,
			displayReset: false,
			displayHow: false
		}); 
	}


}