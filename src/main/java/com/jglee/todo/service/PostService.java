package com.jglee.todo.service;

import com.jglee.todo.domain.PostRepository;
import com.jglee.todo.domain.Post;
import com.jglee.todo.dto.PostListResponseDto;
import com.jglee.todo.dto.PostResponseDto;
import com.jglee.todo.dto.PostSaveRequestDto;
import com.jglee.todo.dto.PostUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public Long save(PostSaveRequestDto dto) {
        return postRepository.save(dto.toEntity()).getId();
    }

    @Transactional
    public PostResponseDto findById(Long id) {
        Post entity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id = " + id));
        return new PostResponseDto(entity);
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> findAllDesc() {
        return postRepository.findAllDesc().stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Long delete (Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        postRepository.delete(post);
        return id;
    }

    public Long update(Long id, PostUpdateRequestDto dto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        post.update(dto);
        postRepository.save(post);
        return id;
    }

}
