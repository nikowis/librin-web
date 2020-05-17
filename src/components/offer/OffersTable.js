import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {Delete, Edit} from '@material-ui/icons';
import {Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import PaginationComponent from "../PaginationComponent";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {OfferStatus} from "../../common/app-constants";

function OffersTable(props) {

    const {t} = useTranslation();
    const {offers, handleView, handleEdit, handleDelete, currentPathname, currentPage, totalPages} = props;

    const offerRows = () => {
        return offers.map((offer) => {
            return <TableRow key={offer.id}>
                <TableCell component="th" scope="row">
                    {offer.title}
                </TableCell>
                <TableCell align="right">{offer.author}</TableCell>
                <TableCell align="right">{offer.price}</TableCell>
                <TableCell align="right">{offer.status}</TableCell>
                <TableCell align="right">{new Date(offer.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">{offer.owner.username}</TableCell>
                <TableCell align="right">
                    <div className="quick-action-btns">
                    {
                        handleView ?
                            <Button size={'small'} variant="outlined"
                                    onClick={() => handleView(offer)}>
                                <VisibilityIcon/>
                            </Button> : null
                    }
                    {
                        handleEdit && OfferStatus.ACTIVE === offer.status ?
                            <Button size={'small'} variant="outlined"
                                    onClick={() => handleEdit(offer)}>
                                <Edit/>
                            </Button> : null
                    }
                    {
                        handleDelete && OfferStatus.ACTIVE === offer.status ?
                            <Button size={'small'} variant="outlined" color="secondary"
                                    onClick={() => handleDelete(offer)}>
                                <Delete/>
                            </Button> : null
                    }
                    </div>
                </TableCell>
            </TableRow>
        });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">{t('title')}</TableCell>
                            <TableCell align="right">{t('author')}</TableCell>
                            <TableCell align="right">{t('price')}</TableCell>
                            <TableCell align="right">{t('status')}</TableCell>
                            <TableCell align="right">{t('createdAt')}</TableCell>
                            <TableCell align="right">{t('owner')}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offerRows()}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationComponent currentPathname={currentPathname} currentPage={currentPage} totalPages={totalPages}/>
        </>
    );
}

OffersTable.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            ownerId: PropTypes.number.isRequired,
        }),
    ).isRequired,
    currentPathname: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    handleView: PropTypes.func
};

export default OffersTable;
