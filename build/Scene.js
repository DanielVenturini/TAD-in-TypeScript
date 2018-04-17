var No = /** @class */ (function () {
    function No(id, value) {
        this.id = id;
        this.value = value;
        this.height = 0;
        this.left = this.right = null;
    }
    // getters and setters methods
    No.prototype.getId = function () {
        return this.id;
    };
    No.prototype.setId = function (id) {
        this.id = id;
    };
    No.prototype.getValue = function () {
        return this.value;
    };
    No.prototype.setValue = function (value) {
        this.value = value;
    };
    No.prototype.getHeight = function () {
        return this.height;
    };
    No.prototype.setHeight = function (height) {
        this.height = height;
    };
    No.prototype.getRight = function () {
        return this.right;
    };
    No.prototype.setRight = function (right) {
        this.right = right;
    };
    No.prototype.getLeft = function () {
        return this.left;
    };
    No.prototype.setLeft = function (left) {
        this.left = left;
    };
    return No;
}());
/// <reference path="No.ts" />
// doubly chained - duplamente encadeada
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.qtd = 0;
        this.first = null;
        this.last = null;
    }
    ArrayList.prototype.isEmpty = function () {
        return this.qtd == 0;
    };
    ArrayList.prototype.size = function () {
        return this.qtd;
    };
    ArrayList.prototype.createElement = function (id, value) {
        return new No(id, value);
    };
    ArrayList.prototype.add = function (value) {
        this.qtd += 1;
        var element = this.createElement(this.qtd, value);
        if (this.first == null) {
            this.first = element;
            this.last = element;
            return this.first.getValue();
        }
        // in the list, the right is the next; the left is the prev
        var lastElement = this.last;
        lastElement.setRight(element); // setNext
        element.setLeft(lastElement); // setPrev
        this.last = element;
        return element.getValue();
    };
    ArrayList.prototype.addIn = function (index, value) {
        this.qtd += 1;
        var element = this.createElement(this.qtd, value);
        if (index == 0) {
            element.setRight(this.first);
            this.first.setLeft(element);
            this.first = element;
            return this.first.getValue();
        }
        // if index is invalid or the last, insert in the last position
        if (index >= this.qtd - 1) {
            element.setLeft(this.last);
            this.last.setRight(element);
            this.last = element;
            return element.getValue();
        }
        var i = 1;
        var no = this.first;
        while (i < index) {
            no = no.getRight(); // no = next
            i += 1;
        }
        element.setRight(no.getRight());
        no.getRight().setLeft(element);
        no.setRight(element);
        element.setLeft(no);
        return element.getValue();
    };
    ArrayList.prototype.contains = function (value) {
        var i = 0;
        var element = this.first;
        while (element != null) {
            if (element.getValue() == value) {
                return true;
            }
            else {
                element = element.getRight();
            }
        }
        return false;
    };
    ArrayList.prototype.get = function (index) {
        if (index < 0 || index >= this.qtd) {
            return null;
        }
        var i = 0;
        var element = this.first;
        while (i < index) {
            element = element.getRight();
            i += 1;
        }
        return element.getValue();
    };
    ArrayList.prototype.remove = function (value) {
        var element = this.first;
        while (element != null) {
            if (element.getValue() == value) {
                break;
            }
            element = element.getRight();
        }
        if (element == null) {
            return;
        }
        this.qtd -= 1;
        var last = element.getLeft();
        // is the first element
        if (last == null) {
            this.first = element.getRight();
            return;
        }
        // is the last element
        if (element == this.last) {
            last.setRight(null);
            this.last = last;
            return;
        }
        var next = element.getRight();
        last.setRight(next);
        next.setLeft(last);
    };
    ArrayList.prototype.print = function () {
        var element = this.first;
        while (element != null) {
            console.log(element.getValue());
            element = element.getRight();
        }
    };
    ArrayList.prototype.indexOf = function (value) {
        var i = 0;
        var element = this.first;
        while (element != null) {
            if (element.getValue() == value) {
                return i;
            }
            i += 1;
            element = element.getRight();
        }
        return -1;
    };
    ArrayList.prototype.lastIndexOf = function (value) {
        var i = this.qtd - 1;
        var element = this.last;
        while (element != null) {
            if (element.getValue() == value) {
                return i;
            }
            i -= 1;
            element = element.getLeft();
        }
        return -1;
    };
    return ArrayList;
}());
/// <reference path = "ArrayList.ts" />
var Scenes = /** @class */ (function () {
    function Scenes(id, title, description, object) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.object = object;
    }
    Scenes.prototype.getId = function () {
        return this.id;
    };
    Scenes.prototype.setId = function (id) {
        this.id = id;
    };
    Scenes.prototype.getTitle = function () {
        return this.title;
    };
    Scenes.prototype.setTitle = function (title) {
        this.title = title;
    };
    Scenes.prototype.getDescription = function () {
        return this.description;
    };
    Scenes.prototype.setDescription = function (description) {
        this.description = description;
    };
    Scenes.prototype.getObjects = function () {
        return this.object;
    };
    Scenes.prototype.setObjects = function (object) {
        this.object = object;
    };
    return Scenes;
}());
