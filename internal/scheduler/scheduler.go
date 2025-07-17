package scheduler

import (
	"log"
	"time"

	"github.com/robfig/cron/v3"
)

func Start() {
	c := cron.New()
	// minute, hour, dayOfMonth, month, dayOfWeek
	// Example: Every 3 minutes at 1 AM, 10 AM, and 11 PM on weekdays
	// "," for combined scheduling, e.g. "* 1,10,23 * * *" for 1 AM, 10 AM, and 11 PM
	// "*/3 * * * *" for every 3 minutes
	// "-" for ranges, e.g. "* * * * 1-5" for Monday to Friday
	_, err := c.AddFunc("*/3 1,10,23 * * 1-5", func() {
		log.Printf("Scheduled task triggered at %s", time.Now().Format(time.RFC3339))
	})
	if err != nil {
		log.Printf("Failed to schedule task: %v", err)
	}
	c.Start()
}
