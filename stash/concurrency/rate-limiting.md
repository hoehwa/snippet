# Go by Example: Rate Limiting

Rate limiting is an important mechanism for controlling resource utilization and maintaining quality of service. Go elegantly supports rate limiting with goroutines, channels, and tickers.

```go
package main

 

import (
    "fmt"
    "time"
)

 

func main() {
```

First we’ll look at basic rate limiting. Suppose we want to limit our handling of incoming requests. We’ll serve these requests off a channel of the same name.

```go
    requests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        requests <- i
    }
    close(requests)
```

This limiter channel will receive a value every 200 milliseconds. This is the regulator in our rate limiting scheme.

```go
    limiter := time.Tick(200 * time.Millisecond)
```

By blocking on a receive from the limiter channel before serving each request, we limit ourselves to 1 request every 200 milliseconds.

```go
    for req := range requests {
        <-limiter
        fmt.Println("request", req, time.Now())
    }
```

We may want to allow short bursts of requests in our rate limiting scheme while preserving the overall rate limit. We can accomplish this by buffering our limiter channel. This burstyLimiter channel will allow bursts of up to 3 events.

```go
    burstyLimiter := make(chan time.Time, 3)
```

Fill up the channel to represent allowed bursting.

```go
    for i := 0; i < 3; i++ {
        burstyLimiter <- time.Now()
    }
```

Every 200 milliseconds we’ll try to add a new value to burstyLimiter, up to its limit of 3.

```go
    go func() {
        for t := range time.Tick(200 * time.Millisecond) {
            burstyLimiter <- t
        }
    }()
```

Now simulate 5 more incoming requests. The first 3 of these will benefit from the burst capability of burstyLimiter.

```go
    burstyRequests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        burstyRequests <- i
    }
    close(burstyRequests)
    for req := range burstyRequests {
        <-burstyLimiter
        fmt.Println("request", req, time.Now())
    }
}
```

Running our program we see the first batch of requests handled once every ~200 milliseconds as desired.

```shell
$ go run rate-limiting.go
request 1 2012-10-19 00:38:18.687438 +0000 UTC
request 2 2012-10-19 00:38:18.887471 +0000 UTC
request 3 2012-10-19 00:38:19.087238 +0000 UTC
request 4 2012-10-19 00:38:19.287338 +0000 UTC
request 5 2012-10-19 00:38:19.487331 +0000 UTC

For the second batch of requests we serve the first 3 immediately because of the burstable rate limiting, then serve the remaining 2 with ~200ms delays each.
 

request 1 2012-10-19 00:38:20.487578 +0000 UTC
request 2 2012-10-19 00:38:20.487645 +0000 UTC
request 3 2012-10-19 00:38:20.487676 +0000 UTC
request 4 2012-10-19 00:38:20.687483 +0000 UTC
request 5 2012-10-19 00:38:20.887542 +0000 UTC
```
