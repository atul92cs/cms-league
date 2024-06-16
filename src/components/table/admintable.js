import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Table } from 'react-bootstrap';
import { MdOutlineAdjust } from 'react-icons/md';
import parse from 'html-react-parser';
import { getValueWithApiKey } from '../../utilities/utils';
import { IconContext } from 'react-icons';
import DetailedView from '../detailview/detailedview';
import { openModal, closeModal } from '../../services/detailmodal';
import { openupdateModal, closeupdateModal } from '../../services/updateform';
import { openPrizeModal, closePrizeModal } from '../../services/detailapimodal';
import DetailApiView from '../detailview/detailapiview';
import { getPrizes } from '../../services/prize';
import DetailDataView from '../detailview/detailedDataView';
import { getTeamDetails } from "../../services/team";

function TableView({ data, displayedColumns, fieldActions, UpdateForm, toggleStatus, dataColumns }) {
  const dispatch = useDispatch();
  const [cellValue, setCellValue] = useState({});
  const detailModalOpen = useSelector((store) => store.detailmodal.detailModalOpen);
  const { updateFormOpen } = useSelector((store) => store.updateformmodal);
  const [prizeModalOpen, setPrizeModalOpen] = useState(false);
  const { prizes, loading } = useSelector((state) => state.prizereducer);
  const [teamdetailsModal, setTeamDetailsModal] = useState(false);
  const { team } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    setCellValue(data);
  }, [data]);

  const openDetailModal = (item) => {
    dispatch(openModal());
    setCellValue(item);
  };

  const closeDetailModal = () => {
    dispatch(closeModal());
  };

  const closeUpdateForm = () => {
    dispatch(closeupdateModal());
  };

  const openUpdateForm = (item) => {
    dispatch(openupdateModal());
    setCellValue(item);
  };

  const activateStatus = (item) => {
    let status = 'active';
    let { id } = item;
    let company = { status, id };
    dispatch(toggleStatus(company));
  };

  const openPrizeView = async (item) => {
    dispatch(openPrizeModal());
    setCellValue(item);
    let filter = `{"where":{"and":[{"tournamentid":${item.id}}]}}`;
    await dispatch(getPrizes(filter));
    setPrizeModalOpen(true);
  };

  const closePrizeView = () => {
    setPrizeModalOpen(false);
  };

  const openTeamDetailsModal = async (item) => {
    setCellValue(item);
    await dispatch(getTeamDetails({ id: item.id }));
    console.log(team)
    setTeamDetailsModal(true);
  };

  const closeTeamDetailsModal = () => {
    setTeamDetailsModal(false);
  };

  const deactivateStatus = (item) => {
    let status = 'inactive';
    let { id } = item;
    let company = { status, id };
    dispatch(toggleStatus(company));
  };

  const args = {
    autohide: true,
    flip: true,
  };

  const getTableActions = (item, columnValue) => {
    let { status } = item;
    switch (columnValue['type']) {
      case 'edit':
        return (
          <div>
            <Button color='primary' onClick={() => openUpdateForm(item)}>
              Edit
            </Button>
          </div>
        );
      case 'status':
        if (status === 'active') {
          return (
            <div>
              <Button variant='danger' onClick={() => deactivateStatus(item)}>
                Deactivate
              </Button>
            </div>
          );
        }
        return (
          <div>
            <Button variant='success' onClick={() => activateStatus(item)}>
              Activate
            </Button>
          </div>
        );
      case 'viewdata':
        return (
          <div>
            <Button color='dark' onClick={() => openPrizeView(item)}>
              View Prizes
            </Button>
          </div>
        );
      case 'viewdetails':
        return (
          <div>
            <Button color='dark' onClick={() => openTeamDetailsModal(item)}>
              View Detail
            </Button>
          </div>
        );
      default:
        return (
          <div>
            <Button color='dark' onClick={() => openDetailModal(item)}>
              View
            </Button>
          </div>
        );
    }
  };

  const getCellValue = (item, columnValue) => {
    const value = item[columnValue['value']];

    switch (columnValue['type']) {
      case 'enum_icon':
        return (
          <div>
            <IconContext.Provider value={{ color: value === 'active' ? 'green' : 'red', className: 'react-status-icon' }}>
              <MdOutlineAdjust />
            </IconContext.Provider>
          </div>
        );
      case 'image':
        return <img src={value} alt='' height={45} width={55} />;
      case 'content':
        return (
          <Container>
            <div className='text-truncate'>{parse(value)}</div>
          </Container>
        );
      default:
        return getValueWithApiKey(item, columnValue);
    }
  };

  return (
    <div className='admin-table'>
      <Table bordered>
        <thead>
          <tr>
            {displayedColumns.map((column) => (
              <th key={`${column['header']}-${column['value']}`}>{column['header'].toUpperCase()}</th>
            ))}
            {fieldActions && <th colSpan={3}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                {displayedColumns.map((columnName) => (
                  <td key={columnName['value']}>{getCellValue(item, columnName)}</td>
                ))}
                {fieldActions &&
                  fieldActions.map((column, i) => (
                    <td key={i}>{getTableActions(item, column)}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>

      {detailModalOpen && <DetailedView data={cellValue} fields={displayedColumns} handleClose={closeDetailModal} />}
      {updateFormOpen && UpdateForm && <UpdateForm data={cellValue} />}
      {prizeModalOpen && prizes && <DetailApiView data={prizes} modalState={prizeModalOpen} closeModal={closePrizeView} />}
      {teamdetailsModal && team && <DetailDataView data={team} modalState={teamdetailsModal} closeModal={closeTeamDetailsModal} />}    
    </div>
  );
}

export default TableView;
