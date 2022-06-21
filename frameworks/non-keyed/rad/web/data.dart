import 'package:js/js.dart';

var itemCount = 0;
var itemCountUntracked = 0;

class DataItem {
  final int id;
  final String idString;
  String label;

  DataItem(
    this.label, {
    int? id,
  })  : id = id ?? ++itemCountUntracked,
        idString = '${id ?? itemCountUntracked}';
}

List<DataItem> buildData([count = 100]) {
  var data = <DataItem>[];
  var i = 0;

  while (i++ < count) {
    data.add(
      DataItem(
        "${adjectives[random(adjectives.length)]} "
        "${colors[random(colors.length)]} "
        "${nouns[random(nouns.length)]}",
      ),
    );
  }

  return data;
}

@JS('random')
external int random(Object max);

const adjectives = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy"
];

const colors = [
  "red",
  "yellow",
  "blue",
  "green",
  "pink",
  "brown",
  "purple",
  "brown",
  "white",
  "black",
  "orange"
];

const nouns = [
  "table",
  "chair",
  "house",
  "bbq",
  "desk",
  "car",
  "pony",
  "cookie",
  "sandwich",
  "burger",
  "pizza",
  "mouse",
  "keyboard"
];
