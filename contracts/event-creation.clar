;; Event Creation Contract

;; Define data structures
(define-map events
  { event-id: uint }
  {
    creator: principal,
    description: (string-ascii 256),
    start-time: uint,
    end-time: uint,
    status: (string-ascii 20)
  }
)

(define-data-var next-event-id uint u1)

;; Error codes
(define-constant err-unauthorized (err u100))
(define-constant err-invalid-times (err u101))
(define-constant err-event-not-found (err u102))

;; Functions
(define-public (create-event (description (string-ascii 256)) (start-time uint) (end-time uint))
  (let
    ((event-id (var-get next-event-id)))
    (asserts! (> end-time start-time) err-invalid-times)
    (asserts! (> start-time block-height) err-invalid-times)
    (map-set events
      { event-id: event-id }
      {
        creator: tx-sender,
        description: description,
        start-time: start-time,
        end-time: end-time,
        status: "upcoming"
      }
    )
    (var-set next-event-id (+ event-id u1))
    (ok event-id)
  )
)

(define-public (cancel-event (event-id uint))
  (let
    ((event (unwrap! (map-get? events { event-id: event-id }) err-event-not-found)))
    (asserts! (is-eq (get creator event) tx-sender) err-unauthorized)
    (asserts! (is-eq (get status event) "upcoming") err-unauthorized)
    (ok (map-set events
      { event-id: event-id }
      (merge event { status: "cancelled" })
    ))
  )
)

(define-read-only (get-event (event-id uint))
  (map-get? events { event-id: event-id })
)

