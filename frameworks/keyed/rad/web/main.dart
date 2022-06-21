import 'package:rad/rad.dart';
import 'package:rad/widgets_html.dart';

import 'data.dart';
import 'jumbotron.dart';

void main() {
  runApp(
    app: const App(),
    targetId: 'main',
    debugOptions: DebugOptions.productionMode,
  );
}

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  var _data = <DataItem>[];
  DataItem? _selected;

  @override
  Widget build(BuildContext context) {
    return Division(
      classAttribute: 'container',
      children: [
        Jumbotron(
          run: _run,
          runLots: _runLots,
          append: _append,
          prepend: _prepend,
          update: _update,
          swap: _swap,
          clear: _clear,
          moveToTop: _moveToTop,
          moveToBottom: _moveToBottom,
          addToTop: _addToTop,
          addToBottom: _addToBottom,
          add100ToTop: _add100ToTop,
          add100ToBottom: _add100ToBottom,
        ),
        Table(
          classAttribute: 'table table-hover table-striped test-data',
          child: TableBody(
            children: [
              for (var dataItem in _data)
                ItemRow(
                  dataItem: dataItem,
                  selected: _selected == dataItem,
                  selectCallback: (_) => _select(dataItem),
                  removeCallback: (_) => _remove(dataItem),
                ),
            ],
          ),
        ),
      ],
    );
  }

  void _run(EmittedEvent event) {
    setState(() {
      itemCount = 0;
      _data = buildData(1000);

      _selected = null;
    });
  }

  void _runLots(EmittedEvent event) {
    setState(() {
      itemCount = 0;
      _data = buildData(10000);

      _selected = null;
    });
  }

  void _append(EmittedEvent event) {
    setState(() {
      _data.addAll(buildData(1000));
    });
  }

  void _prepend(EmittedEvent event) {
    setState(() {
      _data.insertAll(0, buildData(1000));
    });
  }

  void _update(EmittedEvent event) {
    setState(() {
      for (var i = 0; i < _data.length; i += 10) {
        var item = _data[i];

        _data[i] = DataItem(item.label + ' !!!', id: item.id);
      }
    });
  }

  void _clear(EmittedEvent event) {
    setState(() {
      _data.clear();

      _selected = null;
    });
  }

  void _swap(EmittedEvent event) {
    setState(() {
      var temp = _data[1];
      _data[1] = _data[998];
      _data[998] = temp;
    });
  }

  void _select(DataItem dataItem) {
    setState(() {
      _selected = dataItem;
    });
  }

  void _remove(DataItem dataItem) {
    setState(() {
      _data.remove(dataItem);
    });
  }

  void _moveToTop(EmittedEvent event) {
    setState(() {
      _data.insert(1, _data.removeAt(998));
    });
  }

  void _moveToBottom(EmittedEvent event) {
    setState(() {
      _data.insert(998, _data.removeAt(1));
    });
  }

  void _addToTop(EmittedEvent event) {
    setState(() {
      _data.insert(1, buildData(1).first);
    });
  }

  void _addToBottom(EmittedEvent event) {
    setState(() {
      _data.insert(998, buildData(1).first);
    });
  }

  void _add100ToTop(EmittedEvent event) {
    setState(() {
      _data.insertAll(1, buildData(100));
    });
  }

  void _add100ToBottom(EmittedEvent event) {
    setState(() {
      _data.insertAll(998, buildData(100));
    });
  }
}

class ItemRow extends TableRow {
  final bool selected;
  final DataItem dataItem;

  @override
  bool shouldUpdateWidget(covariant ItemRow oldWidget) {
    return selected != oldWidget.selected || dataItem != oldWidget.dataItem;
  }

  @override
  bool shouldUpdateWidgetChildren(oldWidget, shouldUpdateWidget) {
    return shouldUpdateWidget;
  }

  ItemRow({
    required this.selected,
    required this.dataItem,
    required EventCallback selectCallback,
    required EventCallback removeCallback,
  }) : super(
          key: Key(dataItem.idString),
          classAttribute: selected ? 'danger' : '',
          children: [
            TableDataCell(
              classAttribute: 'col-md-1',
              innerText: dataItem.idString,
            ),
            TableDataCell(
              classAttribute: 'col-md-4',
              child: Anchor(
                onClick: selectCallback,
                innerText: dataItem.label,
              ),
            ),
            TableDataCell(
              classAttribute: 'col-md-1',
              child: Anchor(
                onClick: removeCallback,
                child: const Span(
                  classAttribute: 'glyphicon glyphicon-remove',
                ),
              ),
            ),
            const TableDataCell(classAttribute: 'col-md-6'),
          ],
        );
}
