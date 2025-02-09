;; Odds Calculation Contract

;; Define data structures
(define-map event-odds
  { event-id: uint }
  {
    home-odds: uint,
    away-odds: uint,
    draw-odds: uint,
    last-updated: uint
  }
)

;; Error codes
(define-constant err-invalid-odds (err u101))

;; Functions
(define-public (set-initial-odds (event-id uint) (home-odds uint) (away-odds uint) (draw-odds uint))
  (begin
    (asserts! (and (> home-odds u0) (> away-odds u0) (> draw-odds u0)) err-invalid-odds)
    (ok (map-set event-odds
      { event-id: event-id }
      {
        home-odds: home-odds,
        away-odds: away-odds,
        draw-odds: draw-odds,
        last-updated: block-height
      }
    ))
  )
)

(define-public (update-odds (event-id uint) (home-odds uint) (away-odds uint) (draw-odds uint))
  (begin
    (asserts! (and (> home-odds u0) (> away-odds u0) (> draw-odds u0)) err-invalid-odds)
    (ok (map-set event-odds
      { event-id: event-id }
      {
        home-odds: home-odds,
        away-odds: away-odds,
        draw-odds: draw-odds,
        last-updated: block-height
      }
    ))
  )
)

(define-read-only (get-odds (event-id uint))
  (map-get? event-odds { event-id: event-id })
)

