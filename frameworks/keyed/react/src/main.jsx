var React = require('react');
var ReactDOM = require('react-dom');

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const A = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean",
  "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive",
  "cheap", "expensive", "fancy"];
const C = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const N = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse",
  "keyboard"];

let nextId = 1;

function buildData(count) {
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`,
    };
  }
  return data;
}

const GlyphIcon = <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>;

class Row extends React.Component {
  onSelect = () => {
    this.props.select(this.props.item);
  }

  onRemove = () => {
    this.props.remove(this.props.item);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item || nextProps.selected !== this.props.selected;
  }

  render() {
    let { selected, item } = this.props;
    return (<tr className={selected ? "danger" : ""}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-4"><a onClick={this.onSelect}>{item.label}</a></td>
      <td className="col-md-1"><a onClick={this.onRemove}>{GlyphIcon}</a></td>
      <td className="col-md-6"></td>
    </tr>);
  }
}

function Button({ id, cb, title }) {
  return (
    <div className="col-sm-6 smallpad">
      <button type="button" className="btn btn-primary btn-block" id={id} onClick={cb}>{title}</button>
    </div>
  );
}

class Jumbotron extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { 
      run, 
      runLots, 
      update, 
      swapRows, 
      append, 
      prepend, 
      moveToTop, 
      moveToBottom, 
      addToTop, 
      addToBottom,
      add100ToTop, 
      add100ToBottom,
      clear, 
     } = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-6">
            <h1>React keyed</h1>
          </div>
          <div className="col-md-6">
            <div className="row">
              <Button id="run" title="Create 1,000 rows" cb={run} />
              <Button id="runlots" title="Create 10,000 rows" cb={runLots} />
              <Button id="update" title="Update every 10th row" cb={update} />
              <Button id="swaprows" title="Swap Rows" cb={swapRows} />
              <Button id="append" title="Append 1,000 rows" cb={append} />
              <Button id="prepend" title="Prepend 1,000 rows" cb={prepend} />
              <Button id="movetotop" title="Move to Top" cb={moveToTop} />
              <Button id="movetobottom" title="Move to Bottom" cb={moveToBottom} />
              <Button id="addtotop" title="Add to Top" cb={addToTop} />
              <Button id="addtobottom" title="Add to Bottom" cb={addToBottom} />
              <Button id="add100totop" title="Add 100 to Top" cb={add100ToTop} />
              <Button id="add100tobottom" title="Add 100 to Bottom" cb={add100ToBottom} />
              <Button id="clear" title="Clear" cb={clear} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
  state = {
    data: [],
    selected: 0,
  };

  run = () => {
    this.setState({ data: buildData(1000), selected: 0 });
  }

  runLots = () => {
    this.setState({ data: buildData(10000), selected: 0 });
  }

  append = () => {
    this.setState({ data: this.state.data.concat(buildData(1000)) });
  }

  prepend = () => {
    const data = this.state.data;

    data.splice(0, 0, ...buildData(1000));

    this.forceUpdate();
  }

  update = () => {
    const data = this.state.data;
    for (let i = 0; i < data.length; i += 10) {
      const item = data[i];
      data[i] = { id: item.id, label: item.label + ' !!!' };
    }
    this.forceUpdate();
  }

  select = (item) => {
    this.setState({ selected: item.id });
  }

  remove = (item) => {
    const data = this.state.data;
    data.splice(data.indexOf(item), 1);
    this.forceUpdate();
  }

  clear = () => {
    this.setState({ data: [], selected: 0 });
  }

  swapRows = () => {
    const data = this.state.data;
    if (data.length > 998) {
      let temp = data[1];
      data[1] = data[998];
      data[998] = temp;
    }
    this.forceUpdate();
  }

  moveToTop = () => {
    const data = this.state.data;
    if (data.length > 998) {
      let temp = data[998];
      data.splice( 998, 1);
      data.splice( 1, 0, temp );
    }
    this.forceUpdate();
  }

  moveToBottom = () => {
    const data = this.state.data;
    if (data.length > 998) {
      let temp = data[1];
      data.splice( 1, 1);
      data.splice( 998, 0, temp );
    }
    this.forceUpdate();
  }

  addToTop = () => {
    const data = this.state.data;
    data.splice( 1, 0, buildData(1)[0] );
    this.forceUpdate();
  }

  addToBottom = () => {
    const data = this.state.data;
    data.splice( 998, 0, buildData(1)[0] );
    this.forceUpdate();
  }

  add100ToTop = () => {
    const data = this.state.data;
    data.splice( 1, 0, ...buildData(100) );
    this.forceUpdate();
  }

  add100ToBottom = () => {
    const data = this.state.data;
    data.splice( 998, 0, ...buildData(100) );
    this.forceUpdate();
  }

  render() {
    return (<div className="container">
      
      <Jumbotron 
        run={this.run} 
        runLots={this.runLots} 
        update={this.update} 
        swapRows={this.swapRows} 
        append={this.append} 
        prepend={this.prepend}
        moveToTop={this.moveToTop} 
        moveToBottom={this.moveToBottom}
        addToTop={this.addToTop} 
        addToBottom={this.addToBottom}
        add100ToTop={this.add100ToTop} 
        add100ToBottom={this.add100ToBottom}
        clear={this.clear} 
      />

      <table className="table table-hover table-striped test-data"><tbody>
        {this.state.data.map((item, i) => (
          <Row key={item.id} item={item} selected={this.state.selected === item.id} select={this.select} remove={this.remove}></Row>
        ))}
      </tbody></table>
      <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
    </div>);
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('main'),
);
