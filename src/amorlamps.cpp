#include "amorlamps.h"

AmorLamps::AmorLamps(/* args */)
{
}

AmorLamps::~AmorLamps()
{
}

bool AmorLamps::setIsLive(bool isLive)
{
    this->isLive = isLive ;
    return this->isLive;
}

bool AmorLamps::getIsLive()
{
    return this->isLive;
}
