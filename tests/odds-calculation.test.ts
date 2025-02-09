import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for event odds
const eventOdds = new Map()

// Mock functions to simulate contract behavior
function setInitialOdds(eventId: number, homeOdds: number, awayOdds: number, drawOdds: number) {
  if (homeOdds <= 0 || awayOdds <= 0 || drawOdds <= 0) throw new Error("Invalid odds")
  eventOdds.set(eventId, { homeOdds, awayOdds, drawOdds, lastUpdated: Date.now() })
  return true
}

function updateOdds(eventId: number, homeOdds: number, awayOdds: number, drawOdds: number) {
  if (!eventOdds.has(eventId)) throw new Error("Event not found")
  if (homeOdds <= 0 || awayOdds <= 0 || drawOdds <= 0) throw new Error("Invalid odds")
  eventOdds.set(eventId, { homeOdds, awayOdds, drawOdds, lastUpdated: Date.now() })
  return true
}

function getOdds(eventId: number) {
  return eventOdds.get(eventId)
}

describe("Odds Calculation Contract", () => {
  beforeEach(() => {
    eventOdds.clear()
  })
  
  it("should set initial odds", () => {
    const result = setInitialOdds(1, 200, 150, 300)
    expect(result).toBe(true)
    const odds = getOdds(1)
    expect(odds).toBeDefined()
    expect(odds.homeOdds).toBe(200)
    expect(odds.awayOdds).toBe(150)
    expect(odds.drawOdds).toBe(300)
  })
  
  it("should update odds", () => {
    setInitialOdds(1, 200, 150, 300)
    const result = updateOdds(1, 180, 170, 280)
    expect(result).toBe(true)
    const updatedOdds = getOdds(1)
    expect(updatedOdds.homeOdds).toBe(180)
    expect(updatedOdds.awayOdds).toBe(170)
    expect(updatedOdds.drawOdds).toBe(280)
  })
  
  it("should not update odds for non-existent event", () => {
    expect(() => updateOdds(999, 200, 150, 300)).toThrow("Event not found")
  })
})

