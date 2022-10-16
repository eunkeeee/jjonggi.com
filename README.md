# jjonggi.com

Route -> Controller -> Template

<!-- globalRouter -->

/ -> (po) showMainPostings
/join -> (us) join -> home.pug
/login -> (us) login
/search -> (us) search

<!-- postingsRouter -->

/postings/:id -> showPosting -> showPosting.pug
/postings/:id/edit -> edit -> edit.pug
/postings/:id/delete -> deletePosting
/postings/upload -> upload
/postings/:id/comments
/postings/:id/comments/edit
/postings/:id/comments/delete

<!-- userRouter -->

/users/edit -> edit
/users/delete -> deleteAccount
/users/logout -> logout
/users/:id -> see

<!-- templates -->

base.pug (pageTitle)
=> partials/footer

home.pug, showPostings.pug
=> mixins/post
