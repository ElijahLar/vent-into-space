# The Void App

Build a polished, mobile-first web app called Vent.

Vent is NOT a journal, social network, chatbot, therapy app, mood tracker, or productivity tool.

The entire purpose is extremely simple:

A user types something they want to get out of their head, presses send, and the message is visually pulled into a black hole / void and permanently disappears.

The emotional experience should feel like digitally throwing a thought away.

CORE PRODUCT PRINCIPLE

The app should feel:

private

calming

slightly mysterious

minimal

satisfying

emotionally neutral

non-judgmental

Do NOT make it feel clinical, therapeutic, motivational, gamified, or overly “wellness”-focused.

Do not use:

mood tracking

streaks

points

badges

journaling history

AI advice

chatbot replies

inspirational quotes

mental-health scores

analytics dashboards

social features

accounts

authentication

The core interaction should remain extremely simple.



MAIN SCREEN

The main screen should contain only:

The Vent wordmark/logo

A visually beautiful animated black hole / void

A multiline text input

A send button

A very subtle settings/about button

Use a dark, atmospheric background.

Avoid generic gradients, neon cyberpunk styling, glassmorphism overload, or cliché “AI app” aesthetics.

The design should feel premium and restrained.

Think:

almost-black background

soft spatial depth

sparse particles

subtle gravitational distortion

understated typography

lots of negative space

The black hole should be the visual centerpiece without looking like a videogame asset.

It should feel abstract, elegant, and calming rather than scientifically realistic.



TEXT INPUT

Below the void, create a multiline input with placeholder text:

“Say whatever you need to say.”

The input should:

expand naturally for longer messages

support multiple lines

feel good on mobile keyboards

never store draft text after the page is closed

allow Cmd/Ctrl + Enter to send on desktop

have a clear but subtle send button

automatically focus again after a vent is sent

The user should be able to type profanity, anger, sadness, nonsense, long paragraphs, or anything else without the UI reacting or judging them.

There should be NO moderation-style emotional response shown to the user.



THE MOST IMPORTANT PART: SEND ANIMATION

The send animation is the heart of the entire application.

When the user presses send:

The submitted text should visually detach from the input.

The input should immediately clear.

The text should begin moving toward the black hole.

Movement should start gently and accelerate as the message approaches the void.

The text should subtly bend, stretch, distort, shrink, or curve as though affected by gravity.

As it reaches the event horizon, the text should rapidly compress.

The message should disappear completely into the black hole.

The void should briefly react with a subtle ripple, pulse, gravitational distortion, or particle movement.

Everything should quickly return to its calm resting state.

The input should be ready immediately for another vent.

The complete animation should feel extremely satisfying.

Do not simply fade the text out.

It needs to visually feel like the message was physically swallowed by the void.

Use performant browser animation techniques. CSS/SVG/Canvas are fine. If necessary, use a lightweight animation library, but avoid unnecessary dependencies.

Target smooth 60 FPS animation on modern phones.

The message must be removed from application state after the animation finishes.

Do not create a message history.

Once it enters the void, it is gone.



PRIVACY

Privacy is one of the core features.

For the initial version:

no backend

no database

no Supabase

no authentication

no analytics

no message logging

no localStorage containing vent contents

no cookies containing vent contents

no sending message contents to external APIs

Vents should exist only temporarily in browser memory while they are being displayed/animated.

After the animation completes, remove the content entirely from state.

Create a small Privacy section accessible through Settings/About explaining this clearly in plain language.

Suggested copy:

“Your vents stay on your device and aren’t saved. Once they disappear into the void, they’re gone.”

Do not make claims that cannot actually be guaranteed by the implementation.



OPTIONAL MICRO-INTERACTIONS

Add very subtle atmospheric effects:

sparse particles slowly orbiting or drifting around the void

slight gravitational movement when text approaches

black hole glow reacting very slightly to submitted text

tasteful transition when opening the app

subtle button feedback

optional vibration using the Vibration API where supported

Keep everything restrained.

The app should still feel peaceful when nothing is happening.

Do not constantly animate the entire screen.



ACCESSIBILITY

Include:

good text contrast

keyboard navigation

proper focus states

semantic HTML

ARIA labels where needed

support for prefers-reduced-motion

For users with reduced motion enabled, replace the gravitational animation with a simple short shrink/dissolve interaction.

Do not remove functionality.



RESPONSIVENESS

Design mobile-first, especially for modern iPhones.

It should also work beautifully on:

Android phones

iPad/tablets

desktop browsers

On desktop, keep the experience centered and intimate instead of stretching content across the entire screen.

Maximum usable content width should remain relatively narrow.



SETTINGS / ABOUT

The main screen should stay extremely clean.

Put secondary content inside a small Settings/About sheet or modal.

Include:

About Vent

Short explanation:

“Some things don’t need to be saved, analyzed, or solved. Sometimes you just need somewhere to put them.”

Privacy

Explain that vents are not saved.

More apps

Create a tasteful section called:

More apps by Elijah

Use placeholder app cards for:

RepQuest

DentCalm

Live Earth / Disaster Map

Each card can have:

app icon placeholder

name

one-line description

external-link button

Do NOT advertise these apps on the main Vent screen.

Support

Include a subtle:

☕ Buy me a coffee

button.

Supporting the developer should feel completely optional.

No popups asking for donations.

No advertisements.

No premium subscription.

No paywall.



BRAND

App name:

VENT

Potential small tagline:

Say it. Send it. Gone.

Use the tagline sparingly.

The branding should feel modern and memorable without becoming edgy-for-the-sake-of-edgy.

Avoid cliché mental-health imagery such as:

hearts

brains

meditation illustrations

smiling wellness characters

flowers

therapy couches

The void itself should become the recognizable identity of the app.



TECHNICAL DIRECTION

Use:

React

TypeScript

clean reusable components

responsive CSS

minimal dependencies

Structure the code cleanly even though this is a small project.

Possible components:

VentPage

Void

VentInput

VentMessageAnimation

SettingsSheet

MoreApps

PrivacyInfo

Do NOT add backend infrastructure.

Do NOT add authentication.

Do NOT add example journal entries.

Do NOT generate fake user data.

Do NOT create unnecessary dashboard pages.



MOST IMPORTANT DESIGN RULE

If you are unsure whether to add another feature, DON’T.

The simplicity is intentional.

The ideal user experience is:

Open Vent.

Type:

“I am so fucking sick of today.”

Press send.

Watch the sentence get dragged into a black hole.

It disappears.

Feel slightly better.

Close the app.

That’s Vent.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7d03131c-044a-40bb-ad7a-859077b40250).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
