import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { getReadableTime, SC } from '../../../../shared/utils/index'
import TogglePlayButton from '../togglePlay.component'
import './trackListItem.scss'
import TextTruncate from 'react-dotdotdot'
import ActionsDropdown from '../actionsDropDown.component'
import { Link } from 'react-router-dom'
import FallbackImage from '../FallbackImage'
import { IMAGE_SIZES } from '../../../../shared/constants'
import { abbreviate_number } from '../../../../shared/utils'

class trackListItem extends React.Component {

    state = {
        dropdownOpen: false
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if (nextProps.track.id !== this.props.track.id) {
            return true
        }

        if (nextProps.isPlaying !== this.props.isPlaying) {
            return true
        }

        if (nextProps.liked !== this.props.liked) {
            return true
        }

        if (nextProps.reposted !== this.props.reposted) {
            return true
        }

        return false

    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    renderToggleButton = () => {
        const { isPlaying, playTrackFunc } = this.props

        if (isPlaying) {
            return <TogglePlayButton className="toggleButton" />
        }

        const icon = isPlaying ? 'pause' : 'play_arrow'

        return (

            <a href="javascript:void(0)" className="toggleButton" onClick={playTrackFunc.bind(null, true)}>
                <i className={`icon-${icon}`} />
            </a>
        )
    }

    render() {
        const {
            track,
            isPlaying,
            liked,
            reposted,
            // Functions
            likeFunc,
            playTrackFunc,
            show,
            addUpNext,
            toggleRepost
        } = this.props

        if (!track.title) return null

        return (
            <tr className={cn('trackItem', { isPlaying: isPlaying })} onDoubleClick={playTrackFunc.bind(null, false)}>
                <td>
                    <div className="img-with-shadow">
                        <FallbackImage src={SC.getImageUrl(track, IMAGE_SIZES.XSMALL)} />
                        <FallbackImage overflow className="shadow" src={SC.getImageUrl(track, IMAGE_SIZES.XSMALL)} />
                        {
                            track.streamable ? this.renderToggleButton() : null
                        }
                    </div>
                </td>
                <td>
                    <div className="trackTitle">
                        <Link to={`/track/${track.id}`}>
                            <TextTruncate
                                clamp={1}
                                ellipsis="..."
                            >{track.title}</TextTruncate>
                        </Link>
                    </div>
                    <div className="stats d-flex align-items-center">
                        <i className='bx bxs-heart' />

                        <span>{abbreviate_number(track.likes_count || track.favoritings_count)}</span>

                        <i className='bx bx-repost' />
                        <span>{abbreviate_number(track.reposts_count)}</span>

                    </div>
                </td>

                <td className="trackArtist">
                    <Link to={'/user/' + track.user_id}>
                        {track.user.username}
                    </Link>
                </td>
                <td className="time">
                    {getReadableTime(track.duration, true, true)}
                </td>
                <td className="trackitemActions">
                    {/*<i className="icon-retweet"/>
                     <i className="icon-playlist_add"/>*/}

                    <ActionsDropdown
                        toggleLike={likeFunc}
                        toggleRepost={toggleRepost}
                        reposted={reposted}
                        liked={liked}
                        show={show}
                        track={track}
                        addUpNext={addUpNext} />
                </td>
            </tr>
        )
    }
}

trackListItem.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    track: PropTypes.object.isRequired,
    liked: PropTypes.bool.isRequired,
    reposted: PropTypes.bool.isRequired,

    show: PropTypes.func.isRequired,
    likeFunc: PropTypes.func.isRequired,
    playTrackFunc: PropTypes.func.isRequired,
    addUpNext: PropTypes.func.isRequired,
    toggleRepost: PropTypes.func.isRequired
}


export default trackListItem