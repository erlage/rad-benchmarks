import 'package:rad/rad.dart';
import 'package:rad/widgets_html.dart';

class Jumbotron extends Division {
  @override
  bool shouldUpdateWidget(oldWidget) => false;

  @override
  bool shouldUpdateWidgetChildren(oldWidget, shouldUpdateWidget) => false;

  Jumbotron({
    required EventCallback run,
    required EventCallback runLots,
    required EventCallback append,
    required EventCallback prepend,
    required EventCallback update,
    required EventCallback swap,
    required EventCallback clear,
    required EventCallback moveToTop,
    required EventCallback moveToBottom,
    required EventCallback addToTop,
    required EventCallback addToBottom,
    required EventCallback add100ToTop,
    required EventCallback add100ToBottom,
  }) : super(
          className: 'jumbotron',
          child: Division(
            className: 'row',
            children: [
              // heading
              const Division(
                className: 'col-md-6',
                child: Heading1(innerText: 'Rad (keyed)'),
              ),
              Division(
                className: 'col-md-6',
                child: Division(
                  className: 'row',
                  children: [
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'run',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Create 1,000 Rows',
                        onClick: run,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'runlots',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Create 10,000 Rows',
                        onClick: runLots,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'update',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Update every 10th Row',
                        onClick: update,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'swaprows',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Swap Rows',
                        onClick: swap,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'append',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Append 1,000 Rows',
                        onClick: append,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'prepend',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Prepend 1,000 Rows',
                        onClick: prepend,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'movetotop',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Move To top',
                        onClick: moveToTop,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'movetobottom',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Move To Bottom',
                        onClick: moveToBottom,
                      ),
                    ),

                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'addtotop',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Add To top',
                        onClick: addToTop,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'addtobottom',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Add To Bottom',
                        onClick: addToBottom,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'add100totop',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Add 100 To top',
                        onClick: add100ToTop,
                      ),
                    ),
                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'add100tobottom',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Add 100 To Bottom',
                        onClick: add100ToBottom,
                      ),
                    ),

                    Division(
                      className: 'col-sm-6 smallpad',
                      child: Button(
                        id: 'clear',
                        className: 'btn btn-primary btn-block',
                        innerText: 'Clear',
                        onClick: clear,
                      ),
                    ),
                    //
                  ],
                ),
              ),
            ],
          ),
        );
}
