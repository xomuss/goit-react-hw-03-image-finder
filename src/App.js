import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import picturesApi from './servises/pictures-api';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';

class App extends Component {
  static propTypes = {};

  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalPictureUrl: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchPictures();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      pictures: [],
      error: null,
    });
  };

  fetchPictures = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    picturesApi
      .fetchPictures(options)
      .then(hits => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMoreBtnClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onWebPictureClick = e => {
    const largePicture = e.target.getAttribute('modalpicture');

    this.setState(() => ({
      modalPictureUrl: largePicture,
    }));

    this.toggleModal();
  };

  render() {
    const { pictures, isLoading, error, showModal, modalPictureUrl } =
      this.state;
    const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;

    return (
      <div className="App">
        {error && alert('Please try again')}

        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery onPictureClick={this.onWebPictureClick}>
          <ImageGalleryItem data={pictures} />
        </ImageGallery>

        {isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchPictures} />}

        {showModal && (
          <Modal imageUrl={modalPictureUrl} onModalclick={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
