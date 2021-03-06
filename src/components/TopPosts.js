import React from 'react';
import { API } from '../constants';
import { connect } from 'react-redux';
import { fetchPosts, startLoader } from '../actions/postActions';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';

const Container = styled.div`
        position: relative;
        overflow: hidden;
        width: 100%;
        color: #fff;
        background-color: #000;
        box-shadow: inset 0 0 20px #fff;
    `;
    
const Children = styled.div`
        width: 100%
        position: relative;
        height: 550px;
        text-decoration: none;
    `;

const Arrow = styled.div`
    text-shadow: 1px 1px 1px #fff;
    z-index: 100;
    line-height: 500px;
    text-align: center;
    position: absolute;
    top: 0;
    width: 10%;
    font-size: 3em;
    cursor: pointer;
    user-select: none;
    ${props => props.right ? css`left: 90%;` : css`left: 0%;`}
  `;

const CarouselUI = ({ position, total, handleClick, children }) => (
    <Container>
        <Children>
            {children}
            <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
            <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
        </Children>
    </Container>
);
const Carousel = makeCarousel(CarouselUI);

class TopPosts extends React.Component {
    componentDidMount() {
        this.props.startLoader();
        this.props.fetchPosts();
    }
    
    render() {
        if(this.props.posts.allPosts.length === 0) {
            return (
                <div>LOADING</div>
                )
            } else {
            const posts = this.props.posts.allPosts
            const sortedArr = [...posts].sort(function(a, b) {
                return b.likes.length - a.likes.length;
            });
            return (
                <Carousel defaultWait={5000} swipe={true}>
                    <Slide right>
                        <div>
                            <div className="feature-preview">
                                <h1>{sortedArr[0].title}</h1>
                                <p>{sortedArr[0].content.slice(0, 250) + '...'}</p>
                                <a href={`/post/${sortedArr[0].id}`}>Read Post</a>
                            </div>
                            <img src={`${API}/${sortedArr[0].header_img}`} />
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className="feature-preview">
                                <h1>{sortedArr[1].title}</h1>
                                <p>{sortedArr[1].content.slice(0, 250) + '...'}</p>
                                <a href={`/post/${sortedArr[1].id}`}>Read Post</a>
                            </div>
                            <img src={`${API}/${sortedArr[1].header_img}`} />
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className="feature-preview">
                                <h1>{sortedArr[2].title}</h1>
                                <p>{sortedArr[2].content.slice(0, 250) + '...'}</p>
                                <a href={`/post/${sortedArr[2].id}`}>Read Post</a>
                            </div>
                            <img src={`${API}/${sortedArr[2].header_img}`} />
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className="feature-preview">
                                <h1>{sortedArr[3].title}</h1>
                                <p>{sortedArr[3].content.slice(0, 250) + '...'}</p>
                                <a href={`/post/${sortedArr[3].id}`}>Read Post</a>
                            </div>
                            <img src={`${API}/${sortedArr[3].header_img}`} />
                        </div>
                    </Slide>
                    <Slide right>
                        <div>
                            <div className="feature-preview">
                                <h1>{sortedArr[4].title}</h1>
                                <p>{sortedArr[4].content.slice(0, 250) + '...'}</p>
                                <a href={`/post/${sortedArr[4].id}`}>Read Post</a>
                            </div>
                            <img src={`${API}/${sortedArr[4].header_img}`} />
                        </div>
                    </Slide>
                </Carousel>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        startLoader: () => dispatch(startLoader())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPosts);