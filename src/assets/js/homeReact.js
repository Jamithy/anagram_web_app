"use strict";
const e = React.createElement;

class HomeReact extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    liked: false,
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

  render() {
    if (this.state.liked) {
      return "test"
    }

    return (
      <div>
        <button onClick={() => this.setState({ liked: true })}>Like</button>
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
