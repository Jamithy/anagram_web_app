"use strict";
const e = React.createElement;

class HomeReact extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    word1: "",
    word2: "",
    data: [],
  };

  async componentDidMount() {
    const postReq = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/v1/anagram/top-ten", postReq);

    if (response.status !== 200) {
      throw Error(body.message);
    }

    const json = await response.json();
    this.setState({ data: json });
  }

  renderTableData() {
    return this.state.data.map((anagram) => {
      const { word1, word2, count } = anagram; //destructuring
      return (
        <tr>
          <td>{word1}</td>
          <td>{word2}</td>
          <td>{count}</td>
        </tr>
      );
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  isAnagram(w1, w2) {
    console.log(w1)
    console.log(w2)
  }

  render() {
    return (
      <div>
        <label htmlFor="word1">Word 1</label>
        <input type="text" onChange={this.myChangeHandler} name="word1" minLength='1' maxLength='50' autoFocus required/>
        <label htmlFor="word2">Word 2</label>
        <input type="text" onChange={this.myChangeHandler} name="word2" minLength='1' maxLength='50' required/>

        <button onClick={() => this.isAnagram(this.state.word1, this.state.word2)}>Check</button>

        <h1 id="title">Top 10 Anagram Pairs</h1>
        <table id="anagram">
          <tbody>
            <tr>
              <th>Word 1</th>
              <th>Word 1</th>
              <th>Count</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

const domContainer = document.querySelector("#like_button_container");
ReactDOM.render(e(HomeReact), domContainer);
