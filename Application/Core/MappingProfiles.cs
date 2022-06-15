using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //create mapps from one obj to another obj
            CreateMap<Activity, Activity>();
        }
    }
}