import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for bets
const bets = new Map()
let nextBetId = 1

// Mock functions to simulate contract behavior
function placeBet(eventId: number, bettor: string, amount: number, outcome: string) {
  if (amount <= 0) throw new Error("Invalid amount")
  if (!["home", "away", "draw"].includes(outcome)) throw new Error("Invalid outcome")
  const betId = nextBetId++
  bets.set(betId, { bettor, eventId, amount, outcome, status: "active" })
  return betId
}

function settleBet(betId: number, winningOutcome: string) {
  const bet = bets.get(betId)
  if (!bet) throw new Error("Bet not found")
  bet.status = bet.outcome === winningOutcome ? "won" : "lost"
  bets.set(betId, bet)
  return true
}

function getBet(betId: number) {
  return bets.get(betId)
}

describe("Betting Contract", () => {
  beforeEach(() => {
    bets.clear()
    nextBetId = 1
  })
  
  it("should place a bet", () => {
    const betId = placeBet(1, "bettor1", 100, "home")
    expect(betId).toBe(1)
    const bet = getBet(betId)
    expect(bet).toBeDefined()
    expect(bet.amount).toBe(100)
    expect(bet.outcome).toBe("home")
    expect(bet.status).toBe("active")
  })
  
  it("should not allow invalid bet amount", () => {
    expect(() => placeBet(1, "bettor1", 0, "home")).toThrow("Invalid amount")
  })
  
  it("should not allow invalid outcome", () => {
    expect(() => placeBet(1, "bettor1", 100, "invalid")).toThrow("Invalid outcome")
  })
  
  it("should settle a bet", () => {
    const betId = placeBet(1, "bettor1", 100, "home")
    const result = settleBet(betId, "home")
    expect(result).toBe(true)
    const settledBet = getBet(betId)
    expect(settledBet.status).toBe("won")
  })
  
  it("should mark bet as lost when outcome does not match", () => {
    const betId = placeBet(1, "bettor1", 100, "home")
    settleBet(betId, "away")
    const settledBet = getBet(betId)
    expect(settledBet.status).toBe("lost")
  })
})

