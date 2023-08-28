# README

My Boards were conceived as a small [Ruby on Rails 7](https://rubyonrails.org/) demo project.
I decided to put my experience as a React developer aside and opted for modern alternative
approaches like [Hotwire](https://hotwired.dev/), [Turbo](https://turbo.hotwired.dev/),
[Stimulus](https://stimulus.hotwired.dev/). This allowed me to create an application that
looks like an SPA, but runs on the server side and uses a minimal amount of JavaScript.

My Boards allows to store notes and memos in a cloud and share them with
other users. Notes are grouped into boards. By default, all boards are private:
only the board owner can read notes from the board, update them and create new
ones. At the same time, the owner can share some boards with other users.
Boards can be published as read-only or read-write. In the last case, the board
becomes something like a group chat channel. Changes to notes and boards are
broadcast via WebSocket and are instantly visible to all users who interact
with them.

Now My Boards is an MVP only. The next steps are:
* publishing boards for invited users only (now public boards are accessible for all users)
* grouping boards into projects
* boards for P2P messaging
* full-text search integration
* authentication by google account
* adding ability to attach files and images to notes
* Rich Text integration into notes
* internationalization & localization
* notes import/export
* notifications
* UI improvements
* etc.

I am also open for cooperation and commercial offers, including not related
to this project. Please contact if you have some great ideas :)


(c) 2023 Mikhail Dezhurko

Email: [my-boards@mail.ru](mailto:my-boards@mail.ru)
