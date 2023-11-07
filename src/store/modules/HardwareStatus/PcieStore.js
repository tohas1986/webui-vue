import api from '@/store/api';

const PcieStore = {
  namespaced: true,
  state: {
    pcie: [],
  },
  getters: {
    pcie: (state) => state.pcie,
  },
  mutations: {
    setPcieInfo: (state, data) => {
      state.pcie = data.map(({ data }) => {
        const {
          Id,
          Status = {},
          Manufacturer,
          DeviceType,
          SparePartNumber,
          Model,
          Description,
        } = data;
        return {
          id: Id,
          health: Status.Health,
          manufacturer: Manufacturer,
          deviceType: DeviceType,
          statusState: Status.State,
          sparePartNumber: SparePartNumber,
          model: Model,
          description: Description,
          uri: data['@odata.id'],
        };
      });
    },
  },
  actions: {
    async getPcie({ commit }) {
      return await api
        .get('/redfish/v1/Systems/system/PCIeDevices/S0B0D0')
        .then(({ data }) => commit('setPcieInfo', data))
        //.then(({ data: { Members } }) => {
        //  const promises = Members.map((item) => api.get(item['@odata.id']));
        //  return api.all(promises);
        //})
        //.then((response) => commit('setPcieInfo', response))
        .catch((error) => console.log(error));
    },
  },
};

export default PcieStore;
