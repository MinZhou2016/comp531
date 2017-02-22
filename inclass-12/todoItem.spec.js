import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text='TEXT' done={false} toggle={_=>_} remove={_=>_}/>
            </div>
        )
        // findDOMNode and assert 3 children of the ToDoItem element
        const elements = findDOMNode(node).children[0]
        expect(elements.children.length).to.equal(3)
        // assert the innerHTML of the todo is the text you initially set
        expect(elements.children[1].innerHTML).to.equal('TEXT')
    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text='TEXT' done={false} toggle={_=>_} remove={_=>_}/>
            </div>
        )
        // findDOMNode and assert 3 children of the ToDoItem element
        const elements = findDOMNode(node).children[0]
        expect(elements.children.length).to.equal(3)
        // assert there is no child with classname 'completed'
        expect(elements.children[1].className).to.equal('')

    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text='newText' done={toggled} toggle={()=>{toggled=true}} remove={_=>_}/>
            </div>
        )
        // when the checkbox is clicked via TestUtils.Simulate.click()
        const elements = findDOMNode(node).children[0]
        expect(toggled).to.be.false
        TestUtils.Simulate.click(elements.children[0])
        // we expect the variable toggled to be true
        expect(toggled).to.be.true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text='newText' done={removed} remove={()=>{removed=true}} toggle={_=>_}/>
            </div>
        )
        // when the remove button is clicked via TestUtils.Simulate.click()
        const elements = findDOMNode(node).children[0]
        expect(removed).to.be.false
        TestUtils.Simulate.click(elements.children[2])
        // we expect the variable removed to be true
        expect(removed).to.be.true
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        const node = TestUtils.renderIntoDocument(
            <div>
                <ToDoItem text='newText' done={true} toggle={_=>_} remove={_=>_}/>
            </div>
        )
        // the item should have done=true
        const elements = findDOMNode(node).children[0]
        // assert that the rendered className is "completed"
        expect(elements.children[1].className).to.equal('completed')
    })

})
