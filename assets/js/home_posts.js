{
    //method  to submit the form data for new post
    let createPost = function () {
        let newPostForm = $('#new-post-form');  //form id already defined in form tag

        newPostForm.submit(function (e) {
            e.preventDefault();  //To prevent submission of form default
            e.stopImmediatePropagation();
            //define ajax to use submission
            $.ajax({
                type: 'post',   //method type //get, post
                url: '/posts/create',   //url means action to go to which one controller
                data: newPostForm.serialize(), // we need to send the data to create post,convert the data into JSONformat
                //content would be the key and value would be form
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // deletePost($(' .delete-post-button', newPost));   //call the delete function and pass the deleteLink
                    console.log(data);
                }, error: function (err) {
                    console.log(err.responseText);
                }
            });
        });
    }
    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}"><i
                    class="fas fa-trash"></i></a>
            </small>
                                ${post.content}
            <br />
            <small>
                Post created by ${post.user.name}>
                                        </small>
        </p>
        <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add comment">
                                </form>
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">

                            </ul>
                        </div>
                        </div>
                    </li>`);
    }


    createPost();
}