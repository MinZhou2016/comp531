import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0,{width:800,height:800})
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0,{width:800,height:800}) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // IMPLEMENT ME:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({velocity:[1, 1], acceleration:[0.5, -0.5]})
        const { velocity } = update(p, 1.0,{width:800,height:800})

        expect(velocity).to.eql([1.5,0.5]) 
    })

    it('particles should wrap around the world', () => {
        // IMPLEMENT ME:
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
        var test1 = function(){
            const p = particle({position:[0,200], velocity:[-1,0]})
            const {position} = update(p,1.0,{width:800,height:800})
            expect(position).to.eql([800,200])
        }
       
        var test2 = function(){
            const p = particle({position:[800,200], velocity:[1,0]})
            const {position} = update(p,1.0,{width:800,height:800})
            expect(position).to.eql([0,200])
        }

        var test3 = function(){
            const p = particle({position:[800,0], velocity:[0,-1]})
            const {position} = update(p,1.0,{width:800,height:800})
            expect(position).to.eql([800,800])
        }

        var test4 = function(){
            const p = particle({position:[800,800], velocity:[0,1]})
            const {position} = update(p,1.0,{width:800,height:800})
            expect(position).to.eql([800,0])
        }

        test1()
        test2()
        test3()
        test4()

    })

})
