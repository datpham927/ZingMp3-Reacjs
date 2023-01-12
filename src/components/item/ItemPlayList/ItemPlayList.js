import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import LoadImg from '~/components/load/loadImg/LoadImg';
import { v4 as uuidv4 } from 'uuid';
import toastMessage from '~/components/modal/toast';
import { setBooleanEdit, setKindPlaylist, setModalAddPlayList, setModalPortalDelete } from '~/redux/action';
import { setIdPlayList, setPlayListFavorite, setPlayListTitle } from '~/redux/FavoriteList';
import styles from './ItemPlayList.module.scss';

const cx = classNames.bind(styles);

function ItemPlayList({ data, type = '', description, className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState([]);
    const { playListFavorite } = useSelector((state) => state.Favorite);
    const { user } = useSelector((state) => state.action);
    useEffect(() => {
        setFavorite(playListFavorite?.map((e) => e.encodeId));
    }, [playListFavorite]);
    const handleLike = () => {
        user ? dispatch(setPlayListFavorite(data)) : toastMessage('Bạn vui lòng đăng nhập');
    };

    const handleOnClick = (e) => {
        if (e.target === e.currentTarget || e.target.closest('.ItemPlayList_icon-play__e5DCq')) {
            navigate(data.link);
            dispatch(setPlayListTitle([data.title, data.link]));
            dispatch(setKindPlaylist(false));
        }
    };
    const handleOnClickPrivate = (e) => {
        if (e.target === e.currentTarget || e.target.closest('.ItemPlayList_icon-play__e5DCq')) {
            navigate(data.link);
            dispatch(setPlayListTitle([data.title, data.link]));
            dispatch(setKindPlaylist(true));
        }
    };
    return type === 'Single & EP' ? (
        <li className={cx('item', className) + ' l-3 m-3 c-6 col '}>
            <div className={cx('wrapper')}>
                <div className={cx('image-hover')}>
                    <div className={cx('container-image')}>
                        {data.thumbnailM ? <img src={data.thumbnailM} alt="" /> : <LoadImg />}
                        <div className={cx('modal-image')} onClick={(e) => handleOnClick(e)}>
                            <div className={cx('favorite')}>
                                <Button
                                    onClick={() => handleLike()}
                                    small
                                    content={
                                        favorite?.includes(data.encodeId) && user
                                            ? 'Xóa khỏi thư viện'
                                            : 'Thêm vào Thư viện'
                                    }
                                    iconLeft={
                                        favorite?.includes(data.encodeId) && user ? (
                                            <i className="icon ic-like-full"></i>
                                        ) : (
                                            <i className="icon ic-like"></i>
                                        )
                                    }
                                />
                            </div>
                            <div className={cx('icon-play')}>
                                <Button noContent iconLeft={<i className="icon ic-play-circle-outline"></i>} />
                            </div>
                            <Button
                                small
                                content="khác"
                                // onClick={() => handleLike()}
                                iconLeft={<i className="icon ic-more"></i>}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <span className={cx('title')}>
                        <Link to={data.link}>{data.title}</Link>
                    </span>
                    {data.artists &&
                        (data.artists?.length > 0 ? (
                            <span className={cx('subtitle')} style={{ color: 'var(--text-secondary)' }}>
                                {data.releaseDate}
                            </span>
                        ) : (
                            <Link to={data.artists.link}>{data.artists.alias}</Link>
                        ))}
                </div>
            </div>
        </li>
    ) : type === 'private-playlist' ? (
        <li className={cx('item', className) + ' l-3 m-3 c-6 col '}>
            <div className={cx('wrapper')}>
                <div className={cx('image-hover')}>
                    <div className={cx('container-image')}>
                        {data.thumbnailM ? <img src={data.thumbnailM} alt="" /> : <LoadImg />}
                        <div
                            className={cx('modal-image')}
                            onClick={(e) => {
                                handleOnClick(e);
                            }}
                        >
                            <div className={cx('favorite')}>
                                <Button
                                    onClick={() => {
                                        dispatch(setIdPlayList(data.encodeId));
                                        dispatch(setModalPortalDelete(true));
                                    }}
                                    small
                                    content={'Xóa khỏi thư viện'}
                                    iconLeft={<i className="icon ic-close"></i>}
                                />
                            </div>
                            <div className={cx('icon-play')}>
                                <Button noContent iconLeft={<i className="icon ic-play-circle-outline"></i>} />
                            </div>
                            <Button
                                small
                                content="Chỉnh sửa"
                                onClick={() => {
                                    dispatch(setModalAddPlayList(true));
                                    dispatch(setIdPlayList(data.encodeId));
                                    dispatch(setBooleanEdit(true));
                                }}
                                iconLeft={<i className="icon ic-edit"></i>}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <span className={cx('title')}>
                        <Link to={data.link}>{data.title}</Link>
                    </span>

                    {data.name && (
                        <span className={cx('subtitle')}>
                            <span> {data.name}</span>
                        </span>
                    )}
                </div>
            </div>
        </li>
    ) : (
        <li className={cx('item', className) + ' l-3 m-3 c-6 col '}>
            <div className={cx('wrapper')}>
                <div className={cx('image-hover')}>
                    <div className={cx('container-image')}>
                        {data.thumbnailM ? <img src={data.thumbnailM} alt="" /> : <LoadImg />}
                        <div className={cx('modal-image')} onClick={(e) => handleOnClickPrivate(e)}>
                            <div className={cx('favorite')}>
                                <Button
                                    onClick={() => handleLike()}
                                    small
                                    content={
                                        favorite?.includes(data.encodeId) && user
                                            ? 'Xóa khỏi thư viện'
                                            : 'Thêm vào Thư viện'
                                    }
                                    iconLeft={
                                        favorite?.includes(data.encodeId) && user ? (
                                            <i className="icon ic-like-full"></i>
                                        ) : (
                                            <i className="icon ic-like"></i>
                                        )
                                    }
                                />
                            </div>
                            <div className={cx('icon-play')}>
                                <Button noContent iconLeft={<i className="icon ic-play-circle-outline"></i>} />
                            </div>
                            <Button
                                small
                                content="khác"
                                // onClick={() => handleLike()}
                                iconLeft={<i className="icon ic-more"></i>}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <span className={cx('title')}>
                        <Link to={data.link}>{data.title}</Link>
                    </span>

                    <span className={cx('subtitle')}>
                        {!description ? (
                            data?.artists?.map((item, index) => (
                                <span key={uuidv4()}>
                                    <span>
                                        <Link to={item.link}>{item.name}</Link>
                                    </span>
                                    {index < data.artists?.length - 1 && ', '}
                                </span>
                            ))
                        ) : (
                            <span>{data?.sortDescription}</span>
                        )}
                    </span>
                </div>
            </div>
        </li>
    );
}

export default ItemPlayList;
