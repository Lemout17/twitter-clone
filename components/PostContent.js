import ReactTimeAgo from 'react-time-ago'
import Avatar from './Avatar'
import Link from 'next/link'
import PostButtons from '../components/PostButtons'

export default function PostContent({
  text,
  author,
  createdAt,
  _id,
  likesCount,
  big = false,
  likedByMe,
  commentsCount,
  images,
}) {
  function showImages() {
    if (!images?.length) {
      return ''
    }
    return (
      <div className="flex -mx-1">
        {images.length > 0 &&
          images.map((img) => (
            <div className="m-1" key={img}>
              <img src={img} alt="" />
            </div>
          ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex w-full">
        <div>
          {!!author?.image && (
            <Link href={'/' + author?.username}>
              <div className="cursor-pointer">
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>
        <div className="pl-2 grow">
          <div>
            <Link href={'/' + author?.username}>
              <span className="font-bold pr-1 cursor-pointer">
                {author?.name}
              </span>
            </Link>
            {big && <br />}
            <Link href={'/' + author?.username}>
              <span className=" text-twitterLightGray cursor-pointer">
                @{author?.username}
              </span>
            </Link>

            {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo
                  date={Date.parse(createdAt)}
                  timeStyle={'twitter'}
                />
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author?.username}/status/${_id}`}>
                <div className="w-full cursor-pointer">
                  {text}
                  {showImages()}
                </div>
              </Link>
              <PostButtons
                id={_id}
                username={author.username}
                likesCount={likesCount}
                likedByMe={likedByMe}
                commentsCount={commentsCount}
              />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2">
          <Link href={`/${author?.username}/status/${_id}`}>
            <div>
              {text}
              {showImages()}
            </div>
          </Link>
          {createdAt && (
            <div className="text-sm text-twitterLightGray">
              {new Date(createdAt)
                .toISOString()
                .replace('T', ' ')
                .slice(0, 16)
                .split(' ')
                .reverse()
                .join(' ')}
            </div>
          )}
          <PostButtons
            id={_id}
            username={author.username}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          />
        </div>
      )}
    </div>
  )
}
