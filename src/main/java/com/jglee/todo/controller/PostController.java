package com.jglee.todo.controller;

import com.jglee.todo.dto.PostUpdateRequestDto;
import com.jglee.todo.service.PostService;
import com.jglee.todo.dto.PostResponseDto;
import com.jglee.todo.dto.PostSaveRequestDto;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class PostController {

    private PostService postService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        return "test";
    }

    @RequestMapping(value = "/posts", method = RequestMethod.POST)
    public Long savePost(@RequestBody PostSaveRequestDto dto) {
        return postService.save(dto);
    }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.GET)
    public PostResponseDto findPost(@PathVariable Long id) {
        return postService.findById(id);
    }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE)
    public Long removePost(@PathVariable Long id) { return postService.delete(id); }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.PUT)
    public Long updatePost(@PathVariable Long id, @RequestBody PostUpdateRequestDto dto) { return postService.update(id, dto); }
}
