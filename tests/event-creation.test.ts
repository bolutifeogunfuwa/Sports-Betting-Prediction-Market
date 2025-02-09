import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for events
const events = new Map()
let nextEventId = 1

// Mock functions to simulate contract behavior
function createEvent(creator: string, description: string, startTime: number, endTime: number) {
  const eventId = nextEventId++
  events.set(eventId, { creator, description, startTime, endTime, status: "upcoming" })
  return eventId
}

function cancelEvent(eventId: number, sender: string) {
  const event = events.get(eventId)
  if (!event) throw new Error("Event not found")
  if (event.creator !== sender) throw new Error("Unauthorized")
  if (event.status !== "upcoming") throw new Error("Cannot cancel non-upcoming event")
  event.status = "cancelled"
  events.set(eventId, event)
  return true
}

function getEvent(eventId: number) {
  return events.get(eventId)
}

function getEventStatus(eventId: number) {
  const event = events.get(eventId)
  if (!event) throw new Error("Event not found")
  return event.status
}

describe("Event Creation Contract", () => {
  beforeEach(() => {
    events.clear()
    nextEventId = 1
  })
  
  it("should create an event", () => {
    const eventId = createEvent("creator1", "Football Match", 1625097600, 1625184000)
    expect(eventId).toBe(1)
    const event = getEvent(eventId)
    expect(event).toBeDefined()
    expect(event.description).toBe("Football Match")
    expect(event.status).toBe("upcoming")
  })
  
  it("should cancel an event", () => {
    const eventId = createEvent("creator1", "Football Match", 1625097600, 1625184000)
    const result = cancelEvent(eventId, "creator1")
    expect(result).toBe(true)
    const cancelledEvent = getEvent(eventId)
    expect(cancelledEvent.status).toBe("cancelled")
  })
  
  it("should not allow unauthorized cancellation", () => {
    const eventId = createEvent("creator1", "Football Match", 1625097600, 1625184000)
    expect(() => cancelEvent(eventId, "unauthorized")).toThrow("Unauthorized")
  })
  
  it("should get event status", () => {
    const eventId = createEvent("creator1", "Football Match", 1625097600, 1625184000)
    const status = getEventStatus(eventId)
    expect(status).toBe("upcoming")
  })
})

