"use strict";
const e = React.createElement;

class HomeReact extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    disabled: false,
    word1: "",
    word2: "",
    statusMsg: "",
    data: [],
  };

  async componentDidMount() {
    const postReq = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("/api/v1/anagram/top-ten", postReq);

    if (response.status !== 200) {
      throw Error(await response.text());
    }

    const json = await response.json();
    this.setState({ data: json });
  }

  renderTableData() {
    return this.state.data.map((anagram) => {
      const { word1, word2, count } = anagram;
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

  async isAnagram(w1, w2) {
    if (this.state.disabled) {
      return;
    }
    this.setState({disabled: true});
    
    const reqBody = {
      word1: w1,
      word2: w2
    }
    const postReq = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    };
    const response = await fetch("/api/v1/anagram/is-anagram", postReq);
    const text = await response.text();

    if (response.status !== 200) {
      throw Error(text);
    }

    this.setState({ statusMsg: text });

    // Update table
    this.componentDidMount();
    this.setState({disabled: false});
  }

  // Handler for on click
  handleClick = (event) => {
    if (this.state.disabled) {
      return;
    }
    this.setState({disabled: true});
    this.isAnagram(this.state.word1, this.state.word2);
  }

  render() {
    return (
      <div>
        <label htmlFor="word1">Word 1</label>
        <input type="text" onChange={this.myChangeHandler} name="word1" minLength='1' maxLength='50' autoFocus required/>
        <label htmlFor="word2">Word 2</label>
        <input type="text" onChange={this.myChangeHandler} name="word2" minLength='1' maxLength='50' required/>


        <button onClick={this.handleClick} disabled={this.state.disabled}>Check</button>

        <h2>{this.state.statusMsg}</h2>

        <h1 id="title">Top 10 Anagram Pairs</h1>
        <table id="anagram">
          <tbody>
            <tr>
              <th>Word 1</th>
              <th>Word 2</th>
              <th>Count</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

const domContainer = document.querySelector("#home_react");
ReactDOM.render(e(HomeReact), domContainer);