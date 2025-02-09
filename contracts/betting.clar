;; Betting Contract

;; Define data structures
(define-map bets
  { bet-id: uint }
  {
    bettor: principal,
    event-id: uint,
    amount: uint,
    outcome: (string-ascii 20),
    status: (string-ascii 20)
  }
)

(define-map events
  { event-id: uint }
  {
    status: (string-ascii 20),
    result: (optional (string-ascii 20))
  }
)

(define-data-var next-bet-id uint u1)
(define-data-var next-event-id uint u1)

;; Error codes
(define-constant err-event-not-found (err u100))
(define-constant err-invalid-amount (err u101))
(define-constant err-invalid-outcome (err u102))
(define-constant err-bet-not-found (err u103))
(define-constant err-unauthorized (err u104))
(define-constant err-already-settled (err u105))

;; Functions
(define-public (create-event)
  (let
    ((event-id (var-get next-event-id)))
    (map-set events
      { event-id: event-id }
      {
        status: "upcoming",
        result: none
      }
    )
    (var-set next-event-id (+ event-id u1))
    (ok event-id)
  )
)

(define-public (place-bet (event-id uint) (amount uint) (outcome (string-ascii 20)))
  (let
    ((bet-id (var-get next-bet-id))
     (event (unwrap! (map-get? events { event-id: event-id }) err-event-not-found)))
    (asserts! (is-eq (get status event) "upcoming") err-unauthorized)
    (asserts! (> amount u0) err-invalid-amount)
    (asserts! (or (is-eq outcome "home") (is-eq outcome "away") (is-eq outcome "draw")) err-invalid-outcome)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-set bets
      { bet-id: bet-id }
      {
        bettor: tx-sender,
        event-id: event-id,
        amount: amount,
        outcome: outcome,
        status: "active"
      }
    )
    (var-set next-bet-id (+ bet-id u1))
    (ok bet-id)
  )
)

(define-public (submit-result (event-id uint) (result (string-ascii 20)))
  (let
    ((event (unwrap! (map-get? events { event-id: event-id }) err-event-not-found)))
    (asserts! (is-eq (get status event) "upcoming") err-already-settled)
    (asserts! (or (is-eq result "home") (is-eq result "away") (is-eq result "draw")) err-invalid-outcome)
    (ok (map-set events
      { event-id: event-id }
      (merge event {
        status: "settled",
        result: (some result)
      })
    ))
  )
)

(define-public (settle-bet (bet-id uint))
  (let
    ((bet (unwrap! (map-get? bets { bet-id: bet-id }) err-bet-not-found))
     (event (unwrap! (map-get? events { event-id: (get event-id bet) }) err-event-not-found)))
    (asserts! (is-eq (get status event) "settled") err-unauthorized)
    (asserts! (is-some (get result event)) err-unauthorized)
    (if (is-eq (get outcome bet) (unwrap! (get result event) err-unauthorized))
      (let
        ((payout (* (get amount bet) u2))) ;; Simple 1:1 payout
        (try! (as-contract (stx-transfer? payout tx-sender (get bettor bet))))
        (ok (map-set bets { bet-id: bet-id } (merge bet { status: "won" })))
      )
      (ok (map-set bets { bet-id: bet-id } (merge bet { status: "lost" })))
    )
  )
)

(define-read-only (get-bet (bet-id uint))
  (map-get? bets { bet-id: bet-id })
)

(define-read-only (get-event (event-id uint))
  (map-get? events { event-id: event-id })
)

