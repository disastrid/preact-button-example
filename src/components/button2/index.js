// import preact
import { h, render, Component } from 'preact';
    
export default class Button2 extends Component {

    // rendering a function when the button is clicked
    render({clickFunction}) {
        if(!clickFunction){
            clickFunction = () => {
                console.log("passed something as 'clickFunction' that wasn't a function !");
            }
        }   
        return (
            <div>
                <button onClick={clickFunction}>
                    I'm Button 2
                </button>
            </div>
        );
    }
}