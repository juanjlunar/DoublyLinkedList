
class Node {
    /**
     * Value of the node.
     * 
     * @var { any } any
     */
    value;
    /**
     * Next node.
     * 
     * @var { Node } Node
     */
    next = null;
    /**
     * Previous node.
     * 
     * @var { Node } Node
     */
    prev = null;

    constructor( value ) {
        this.value = value;
    }
}


class DoublyLinkedList {
    /**
     * First node in the list.
     * 
     * @var { Node } Node
     */
    head = null;
    /**
     * Last node in the list.
     * 
     * @var { Node } Node
     */
    tail = null;
    /**
     * Number of nodes in the list.
     * 
     * @var { number } number
     */
    length = 0

    /**
     * Appends an element to the end of the collection.
     * 
     * @param { any } value any
     * @returns { DoublyLinkedList } DoublyLinkedList
     */
    push( value ) {
        const newNode = new Node( value );

        if ( !this.head ) {
            this.head = newNode;

            this.tail = newNode;
        } else {
            this.tail.next = newNode;

            newNode.prev = this.tail;

            this.tail = newNode;
        }

        this.length++;

        return this;
    }
    /**
     * Removes the last node in the collection.
     * 
     * @returns { Node } Node
     */
    pop() {
        if ( !this.head ) {
            return;
        }

        const poppedNode = this.tail;

        if ( this.length === 1 ) {
            this.head = null;

            this.tail = null;
        } else {
            this.tail = poppedNode.prev;

            this.tail.next = null;

            poppedNode.prev = null;
        }

        this.length--;

        return poppedNode;
    }
    /**
     * Removes the first node in the collection.
     * 
     * @returns { Node } Node
     */
    shift() {
        if ( !this.head ) {
            return;
        }

        const shiftedHead = this.head;

        if ( this.length === 1 ) {
            this.head = null;

            this.tail = null;
        } else {
            this.head = shiftedHead.next;

            this.head.prev = null;

            shiftedHead.next = null;
        }

        this.length--;

        return shiftedHead;
    }
    /**
     * Add a new initial value in the collection.
     * 
     * @param { any } value any
     * @returns { DoublyLinkedList } DoublyLinkedList
     */
    unshift( value ) {
        const newNode = new Node( value );

        if ( !this.head ) {
            this.head = newNode;

            this.tail = newNode;
        } else {
            this.head.prev = newNode;
    
            newNode.next = this.head;
    
            this.head = newNode;
        }

        this.length++;

        return this;
    }
    /**
     * Retrieve a node from the collection.
     * 
     * @param { number } index number
     * @returns { Node } Node
     */
    get( index ) {
        if ( index < 0 || index >= this.length ) {
            return null;
        }

        let count, current;

        if ( index <= this.length / 2 ) {
            count = 0;

            current = this.head;

            while ( count !== index ) {
                current = current.next;
    
                count++;
            }
        } else {
            count = this.length - 1;
            
            current = this.tail;
            
            while ( count !== index ) {
                current = current.prev;
    
                count--;
            }
        }

        return current;
    }
    /**
     * Update the value of a node by index.
     * 
     * @param { number } index number
     * @param { any } value any
     * @returns { boolean } boolean
     */
    set( index, value ) {
        const node = this.get( index );

        if ( node !== null ) {
            node.value = value;

            return true;
        }

        return false;
    }
    /**
     * Insert a new node in a certain index position.
     * 
     * @param { number } index number
     * @param { any } value any
     * @returns { boolean } boolean
     */
    insert( index, value ) {
        if ( index < 0 || index > this.length ) {
            return false;
        }

        if ( index === 0 ) {
            return !!this.unshift( value );
        }

        if ( index === this.length ) {
            return !!this.push( value );
        }

        const newNode = new Node( value );

        const beforeNode = this.get( index - 1 );

        const afterNode = beforeNode.next;

        beforeNode.next = newNode;

        newNode.prev = beforeNode;

        newNode.next = afterNode;

        afterNode.prev = newNode;

        this.length++;

        return true;
    }
    /**
     * Removes a node by index.
     * 
     * @param { number } index number
     * @returns { Node } Node
     */
    remove( index ) {
        if ( index < 0 || index >= this.length ) {
            return;
        }

        if ( index === 0 ) {
            return this.shift();
        }

        if ( index === this.length - 1 ) {
            return this.pop();
        }

        const nodeToRemove = this.get( index );

        const beforeNode = nodeToRemove.prev;

        beforeNode.next = nodeToRemove.next;

        const afterNode = nodeToRemove.next;

        afterNode.prev = beforeNode.prev;

        nodeToRemove.prev = null;

        nodeToRemove.next = null;

        this.length--;

        return nodeToRemove;
    }
}