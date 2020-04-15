import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import {useTranslation} from "react-i18next";
import LoaderView from "../../components/LoaderView";
import PropTypes from "prop-types";
import PaginationComponent from "../PaginationComponent";
import {Button} from "react-bootstrap";
import {Delete} from '@material-ui/icons';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {store} from "../../index";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {withRouter} from 'react-router-dom';

function MyOffersListView(props) {

    const {t} = useTranslation();
    const {dispatch, offers, location, history, currentPage, totalPages} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);
    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            replace({
                pathname: pathname,
                search: "?" + new URLSearchParams({page: 1}).toString()
            })
        }
    }, [replace, pathname, pageQuery]);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            return;
        }
        if (offers === null || (pageQuery !== currentPage)) {
            dispatch(Api.getOffers(pageQuery - 1));
        }
    }, [dispatch, offers, currentPage, pageQuery]);

    const handleDelete = (id) => {
        dispatch(Api.removeOffer(id)).then(res => {
            if (res.action.payload && !res.action.payload.status) {
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerDeleted')});
                setTimeout(() => {
                    store.dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
            }
        });
    };

    const offerRows = () => {
        return offers.map((offer) => {
            return (<tr key={offer.id}>
                <td>{offer.title}</td>
                <td>{offer.author}</td>
                <td className={'table-action-buttons'}>
                    <Button size={'sm'} variant="outline-danger"
                            onClick={() => handleDelete(offer.id)}><Delete/></Button>
                </td>
            </tr>);
        });
    };

    const offerTableWithPagination = () => {
        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>{t('title')}</th>
                        <th>{t('author')}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {offerRows()}
                    </tbody>
                </Table>
                <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
            </>
        );
    };

    const getView = () => {
        return <>{pageQuery <= totalPages ? offerTableWithPagination() : t('noElementsFound')}</>;
    };

    return (
        <React.Fragment>
            {offers === null ? <LoaderView/> : getView()}
        </React.Fragment>
    );
}

MyOffersListView.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired
        }),
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
}))(withRouter(MyOffersListView));
